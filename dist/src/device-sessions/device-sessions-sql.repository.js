"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionsRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_module_1 = require("../database/postgres.module");
function rowToSessionDoc(row) {
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
let DeviceSessionsRepository = class DeviceSessionsRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async createSession(userId, deviceId, issuedAt, expirationDate, ip, deviceName) {
        const result = await this.pool.query(`INSERT INTO device_sessions (user_id, device_id, issued_at, expiration_date, last_active_date, ip, device_name)
       VALUES ($1, $2, $3, $4, $3, $5, $6)
       RETURNING *`, [userId, deviceId, issuedAt, expirationDate, ip, deviceName]);
        return rowToSessionDoc(result.rows[0]);
    }
    async findByDeviceId(deviceId) {
        const result = await this.pool.query(`SELECT * FROM device_sessions WHERE device_id = $1`, [deviceId]);
        if (result.rows.length === 0)
            return null;
        return rowToSessionDoc(result.rows[0]);
    }
    async updateSession(deviceId, issuedAt, expirationDate) {
        const result = await this.pool.query(`UPDATE device_sessions
       SET issued_at = $2,
           expiration_date = $3,
           last_active_date = $2
       WHERE device_id = $1`, [deviceId, issuedAt, expirationDate]);
        return (result.rowCount ?? 0) >= 1;
    }
    async deleteByDeviceId(deviceId) {
        const result = await this.pool.query(`DELETE FROM device_sessions WHERE device_id = $1`, [deviceId]);
        return (result.rowCount ?? 0) > 0;
    }
    async findAllByUserId(userId) {
        const result = await this.pool.query(`SELECT * FROM device_sessions WHERE user_id = $1`, [userId]);
        return result.rows.map(rowToSessionDoc);
    }
    async deleteAllByUserIdExceptDeviceId(userId, deviceId) {
        await this.pool.query(`DELETE FROM device_sessions WHERE user_id = $1 AND device_id != $2`, [userId, deviceId]);
    }
};
exports.DeviceSessionsRepository = DeviceSessionsRepository;
exports.DeviceSessionsRepository = DeviceSessionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_module_1.PG_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], DeviceSessionsRepository);
//# sourceMappingURL=device-sessions-sql.repository.js.map