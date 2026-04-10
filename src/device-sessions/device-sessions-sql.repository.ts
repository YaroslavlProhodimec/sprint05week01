import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../database/postgres.module';

/**
 * Maps a SQL row to the shape expected by consumers (DeviceSessionDocument-like object).
 * Consumers access: session.userId, session.deviceId, session.issuedAt, session.ip, etc.
 */
function rowToSessionDoc(row: any): any {
  return {
    _id: row.id,
    userId: row.user_id,
    deviceId: row.device_id,
    issuedAt: row.issued_at instanceof Date ? row.issued_at : new Date(row.issued_at),
    expirationDate: row.expiration_date instanceof Date ? row.expiration_date : new Date(row.expiration_date),
    lastActiveDate: row.last_active_date instanceof Date ? row.last_active_date : new Date(row.last_active_date),
    ip: row.ip,
    deviceName: row.device_name,
  };
}

@Injectable()
export class DeviceSessionsRepository {
  constructor(@Inject(PG_POOL) private pool: Pool) {}

  async createSession(
    userId: string,
    deviceId: string,
    issuedAt: Date,
    expirationDate: Date,
    ip: string,
    deviceName: string,
  ): Promise<any> {
    const result = await this.pool.query(
      `INSERT INTO device_sessions (user_id, device_id, issued_at, expiration_date, last_active_date, ip, device_name)
       VALUES ($1, $2, $3, $4, $3, $5, $6)
       RETURNING *`,
      [userId, deviceId, issuedAt, expirationDate, ip, deviceName],
    );
    return rowToSessionDoc(result.rows[0]);
  }

  async findByDeviceId(deviceId: string): Promise<any | null> {
    const result = await this.pool.query(
      `SELECT * FROM device_sessions WHERE device_id = $1`,
      [deviceId],
    );
    if (result.rows.length === 0) return null;
    return rowToSessionDoc(result.rows[0]);
  }

  async updateSession(
    deviceId: string,
    issuedAt: Date,
    expirationDate: Date,
  ): Promise<boolean> {
    const result = await this.pool.query(
      `UPDATE device_sessions
       SET issued_at = $2,
           expiration_date = $3,
           last_active_date = $2
       WHERE device_id = $1`,
      [deviceId, issuedAt, expirationDate],
    );
    return (result.rowCount ?? 0) >= 1;
  }

  async deleteByDeviceId(deviceId: string): Promise<boolean> {
    const result = await this.pool.query(
      `DELETE FROM device_sessions WHERE device_id = $1`,
      [deviceId],
    );
    return (result.rowCount ?? 0) > 0;
  }

  async findAllByUserId(userId: string): Promise<any[]> {
    const result = await this.pool.query(
      `SELECT * FROM device_sessions WHERE user_id = $1`,
      [userId],
    );
    return result.rows.map(rowToSessionDoc);
  }

  async deleteAllByUserIdExceptDeviceId(
    userId: string,
    deviceId: string,
  ): Promise<void> {
    await this.pool.query(
      `DELETE FROM device_sessions WHERE user_id = $1 AND device_id != $2`,
      [userId, deviceId],
    );
  }
}
