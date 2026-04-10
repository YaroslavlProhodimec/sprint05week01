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
exports.PgInitService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const postgres_module_1 = require("./postgres.module");
let PgInitService = class PgInitService {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async onModuleInit() {
        await this.pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        login VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        password_salt VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        confirmation_code VARCHAR(255),
        is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
        confirmation_expiration_date TIMESTAMP WITH TIME ZONE,
        recovery_code VARCHAR(255),
        recovery_code_expiration TIMESTAMP WITH TIME ZONE
      );

      CREATE TABLE IF NOT EXISTS device_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        device_id VARCHAR(255) NOT NULL UNIQUE,
        issued_at TIMESTAMP WITH TIME ZONE NOT NULL,
        expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
        last_active_date TIMESTAMP WITH TIME ZONE NOT NULL,
        ip VARCHAR(255) NOT NULL DEFAULT 'unknown',
        device_name VARCHAR(500) NOT NULL DEFAULT 'unknown'
      );

      CREATE INDEX IF NOT EXISTS idx_device_sessions_user_id
        ON device_sessions (user_id);

      CREATE INDEX IF NOT EXISTS idx_device_sessions_device_id
        ON device_sessions (device_id);
    `);
        console.log('PostgreSQL tables initialized');
    }
};
exports.PgInitService = PgInitService;
exports.PgInitService = PgInitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(postgres_module_1.PG_POOL)),
    __metadata("design:paramtypes", [pg_1.Pool])
], PgInitService);
//# sourceMappingURL=pg-init.service.js.map