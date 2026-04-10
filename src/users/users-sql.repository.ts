import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../database/postgres.module';
import * as bcrypt from 'bcrypt';

interface SortData {
  sortDirection?: 'asc' | 'desc';
  sortBy?: string;
  pageSize?: number;
  pageNumber?: number;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
}

/**
 * Maps a SQL row to the shape expected by consumers (UserDocument-like object).
 * Consumers access: user._id, user.accountData.*, user.emailConfirmation.*, user.recoveryCode, etc.
 */
function rowToUserDoc(row: any): any {
  return {
    _id: row.id,
    accountData: {
      login: row.login,
      email: row.email,
      passwordHash: row.password_hash,
      passwordSalt: row.password_salt,
      createdAt: row.created_at,
    },
    emailConfirmation: {
      confirmationCode: row.confirmation_code,
      isConfirmed: row.is_confirmed,
      expirationDate: row.confirmation_expiration_date,
    },
    recoveryCode: row.recovery_code,
    recoveryCodeExpiration: row.recovery_code_expiration,
    isConfirmed: row.is_confirmed,
  };
}

@Injectable()
export class UsersRepository {
  constructor(@Inject(PG_POOL) private pool: Pool) {}

  async getAllUsers(sortData: SortData) {
    const sortDirection = sortData.sortDirection ?? 'desc';
    const sortBy = sortData.sortBy ?? 'createdAt';
    const pageSize = +(sortData.pageSize ?? 10);
    const pageNumber = +(sortData.pageNumber ?? 1);
    const searchLoginTerm = sortData.searchLoginTerm ?? null;
    const searchEmailTerm = sortData.searchEmailTerm ?? null;

    // Map API sort fields to SQL columns
    const sortColumnMap: Record<string, string> = {
      login: 'login',
      email: 'email',
      createdAt: 'created_at',
    };
    const sortColumn = sortColumnMap[sortBy] || 'created_at';
    const sortDir = sortDirection === 'asc' ? 'ASC' : 'DESC';

    // Build WHERE conditions
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIdx = 1;

    if (searchLoginTerm) {
      conditions.push(`login ILIKE $${paramIdx}`);
      params.push(`%${searchLoginTerm}%`);
      paramIdx++;
    }
    if (searchEmailTerm) {
      conditions.push(`email ILIKE $${paramIdx}`);
      params.push(`%${searchEmailTerm}%`);
      paramIdx++;
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' OR ')}` : '';

    const countResult = await this.pool.query(
      `SELECT COUNT(*) FROM users ${whereClause}`,
      params,
    );
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const offset = (pageNumber - 1) * pageSize;
    const usersResult = await this.pool.query(
      `SELECT id, login, email, created_at
       FROM users ${whereClause}
       ORDER BY ${sortColumn} ${sortDir}
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, pageSize, offset],
    );

    const pageCount = Math.ceil(totalCount / pageSize);

    return {
      pagesCount: pageCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: usersResult.rows.map((row) => ({
        id: row.id,
        login: row.login,
        email: row.email,
        createdAt: row.created_at,
      })),
    };
  }

  async createUser(
    login: string,
    email: string,
    password: string,
  ): Promise<any> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    const result = await this.pool.query(
      `INSERT INTO users (login, email, password_hash, password_salt, created_at, is_confirmed)
       VALUES ($1, $2, $3, $4, NOW(), TRUE)
       RETURNING id, login, email, created_at`,
      [login, email, passwordHash, passwordSalt],
    );

    const row = result.rows[0];
    return {
      id: row.id,
      login: row.login,
      email: row.email,
      createdAt: row.created_at,
    };
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        `DELETE FROM users WHERE id = $1`,
        [id],
      );
      return (result.rowCount ?? 0) > 0;
    } catch {
      return false;
    }
  }

  async getLoginByUserId(userId: string): Promise<string | null> {
    try {
      const result = await this.pool.query(
        `SELECT login FROM users WHERE id = $1`,
        [userId],
      );
      return result.rows[0]?.login ?? null;
    } catch {
      return null;
    }
  }

  async findById(id: string): Promise<any | null> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id],
      );
      if (result.rows.length === 0) return null;
      return rowToUserDoc(result.rows[0]);
    } catch {
      return null;
    }
  }

  async findByEmail(email: string): Promise<any | null> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    if (result.rows.length === 0) return null;
    return rowToUserDoc(result.rows[0]);
  }

  async findByLogin(login: string): Promise<any | null> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE login = $1`,
      [login],
    );
    if (result.rows.length === 0) return null;
    return rowToUserDoc(result.rows[0]);
  }

  async findByConfirmationCode(code: string): Promise<any | null> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE confirmation_code = $1`,
      [code],
    );
    if (result.rows.length === 0) return null;
    return rowToUserDoc(result.rows[0]);
  }

  async findByRecoveryCode(recoveryCode: string): Promise<any | null> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE recovery_code = $1`,
      [recoveryCode],
    );
    if (result.rows.length === 0) return null;
    return rowToUserDoc(result.rows[0]);
  }

  async createForRegistration(
    login: string,
    email: string,
    password: string,
    confirmationCode: string,
    expirationDate: Date,
  ): Promise<any> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    const result = await this.pool.query(
      `INSERT INTO users (login, email, password_hash, password_salt, created_at,
                          confirmation_code, is_confirmed, confirmation_expiration_date)
       VALUES ($1, $2, $3, $4, NOW(), $5, FALSE, $6)
       RETURNING *`,
      [login, email, passwordHash, passwordSalt, confirmationCode, expirationDate],
    );

    return rowToUserDoc(result.rows[0]);
  }

  async confirmUser(userId: any): Promise<any | null> {
    const id = typeof userId === 'string' ? userId : userId?.toString?.();
    const result = await this.pool.query(
      `UPDATE users
       SET is_confirmed = TRUE,
           confirmation_code = NULL,
           confirmation_expiration_date = NULL
       WHERE id = $1
       RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) return null;
    return rowToUserDoc(result.rows[0]);
  }

  async updateConfirmationCode(
    userId: string,
    confirmationCode: string,
    expirationDate: Date,
  ): Promise<boolean> {
    const result = await this.pool.query(
      `UPDATE users
       SET confirmation_code = $2,
           confirmation_expiration_date = $3,
           is_confirmed = FALSE
       WHERE id = $1`,
      [userId, confirmationCode, expirationDate],
    );
    return (result.rowCount ?? 0) >= 1;
  }

  async setRecoveryCode(
    userId: string,
    recoveryCode: string,
    expirationDate: Date,
  ): Promise<boolean> {
    const result = await this.pool.query(
      `UPDATE users
       SET recovery_code = $2,
           recovery_code_expiration = $3
       WHERE id = $1`,
      [userId, recoveryCode, expirationDate],
    );
    return (result.rowCount ?? 0) >= 1;
  }

  async setNewPassword(userId: string, newPassword: string): Promise<boolean> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, passwordSalt);
    const result = await this.pool.query(
      `UPDATE users
       SET password_hash = $2,
           password_salt = $3,
           recovery_code = NULL,
           recovery_code_expiration = NULL
       WHERE id = $1`,
      [userId, passwordHash, passwordSalt],
    );
    return (result.rowCount ?? 0) >= 1;
  }

  async deleteById(id: string): Promise<boolean> {
    return this.deleteUser(id);
  }
}
