"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_module_1 = require("../database/postgres.module");
const bcrypt = __importStar(require("bcrypt"));
function rowToUserDoc(row) {
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
let UsersRepository = class UsersRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async getAllUsers(sortData) {
        const sortDirection = sortData.sortDirection ?? 'desc';
        const sortBy = sortData.sortBy ?? 'createdAt';
        const pageSize = +(sortData.pageSize ?? 10);
        const pageNumber = +(sortData.pageNumber ?? 1);
        const searchLoginTerm = sortData.searchLoginTerm ?? null;
        const searchEmailTerm = sortData.searchEmailTerm ?? null;
        const sortColumnMap = {
            login: 'login',
            email: 'email',
            createdAt: 'created_at',
        };
        const sortColumn = sortColumnMap[sortBy] || 'created_at';
        const sortDir = sortDirection === 'asc' ? 'ASC' : 'DESC';
        const conditions = [];
        const params = [];
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
        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' OR ')}` : '';
        const countResult = await this.pool.query(`SELECT COUNT(*) FROM users ${whereClause}`, params);
        const totalCount = parseInt(countResult.rows[0].count, 10);
        const offset = (pageNumber - 1) * pageSize;
        const usersResult = await this.pool.query(`SELECT id, login, email, created_at
       FROM users ${whereClause}
       ORDER BY ${sortColumn} ${sortDir}
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`, [...params, pageSize, offset]);
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
    async createUser(login, email, password) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);
        const result = await this.pool.query(`INSERT INTO users (login, email, password_hash, password_salt, created_at, is_confirmed)
       VALUES ($1, $2, $3, $4, NOW(), TRUE)
       RETURNING id, login, email, created_at`, [login, email, passwordHash, passwordSalt]);
        const row = result.rows[0];
        return {
            id: row.id,
            login: row.login,
            email: row.email,
            createdAt: row.created_at,
        };
    }
    async deleteUser(id) {
        try {
            const result = await this.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
            return (result.rowCount ?? 0) > 0;
        }
        catch {
            return false;
        }
    }
    async getLoginByUserId(userId) {
        try {
            const result = await this.pool.query(`SELECT login FROM users WHERE id = $1`, [userId]);
            return result.rows[0]?.login ?? null;
        }
        catch {
            return null;
        }
    }
    async findById(id) {
        try {
            const result = await this.pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
            if (result.rows.length === 0)
                return null;
            return rowToUserDoc(result.rows[0]);
        }
        catch {
            return null;
        }
    }
    async findByEmail(email) {
        const result = await this.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rows.length === 0)
            return null;
        return rowToUserDoc(result.rows[0]);
    }
    async findByLogin(login) {
        const result = await this.pool.query(`SELECT * FROM users WHERE login = $1`, [login]);
        if (result.rows.length === 0)
            return null;
        return rowToUserDoc(result.rows[0]);
    }
    async findByConfirmationCode(code) {
        const result = await this.pool.query(`SELECT * FROM users WHERE confirmation_code = $1`, [code]);
        if (result.rows.length === 0)
            return null;
        return rowToUserDoc(result.rows[0]);
    }
    async findByRecoveryCode(recoveryCode) {
        const result = await this.pool.query(`SELECT * FROM users WHERE recovery_code = $1`, [recoveryCode]);
        if (result.rows.length === 0)
            return null;
        return rowToUserDoc(result.rows[0]);
    }
    async createForRegistration(login, email, password, confirmationCode, expirationDate) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);
        const result = await this.pool.query(`INSERT INTO users (login, email, password_hash, password_salt, created_at,
                          confirmation_code, is_confirmed, confirmation_expiration_date)
       VALUES ($1, $2, $3, $4, NOW(), $5, FALSE, $6)
       RETURNING *`, [login, email, passwordHash, passwordSalt, confirmationCode, expirationDate]);
        return rowToUserDoc(result.rows[0]);
    }
    async confirmUser(userId) {
        const id = typeof userId === 'string' ? userId : userId?.toString?.();
        const result = await this.pool.query(`UPDATE users
       SET is_confirmed = TRUE,
           confirmation_code = NULL,
           confirmation_expiration_date = NULL
       WHERE id = $1
       RETURNING *`, [id]);
        if (result.rows.length === 0)
            return null;
        return rowToUserDoc(result.rows[0]);
    }
    async updateConfirmationCode(userId, confirmationCode, expirationDate) {
        const result = await this.pool.query(`UPDATE users
       SET confirmation_code = $2,
           confirmation_expiration_date = $3,
           is_confirmed = FALSE
       WHERE id = $1`, [userId, confirmationCode, expirationDate]);
        return (result.rowCount ?? 0) >= 1;
    }
    async setRecoveryCode(userId, recoveryCode, expirationDate) {
        const result = await this.pool.query(`UPDATE users
       SET recovery_code = $2,
           recovery_code_expiration = $3
       WHERE id = $1`, [userId, recoveryCode, expirationDate]);
        return (result.rowCount ?? 0) >= 1;
    }
    async setNewPassword(userId, newPassword) {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, passwordSalt);
        const result = await this.pool.query(`UPDATE users
       SET password_hash = $2,
           password_salt = $3,
           recovery_code = NULL,
           recovery_code_expiration = NULL
       WHERE id = $1`, [userId, passwordHash, passwordSalt]);
        return (result.rowCount ?? 0) >= 1;
    }
    async deleteById(id) {
        return this.deleteUser(id);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_module_1.PG_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], UsersRepository);
//# sourceMappingURL=users-sql.repository.js.map