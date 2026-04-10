"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresModule = exports.PG_POOL = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
exports.PG_POOL = 'PG_POOL';
let PostgresModule = class PostgresModule {
};
exports.PostgresModule = PostgresModule;
exports.PostgresModule = PostgresModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.PG_POOL,
                useFactory: async (configService) => {
                    const pgUrl = configService.get('POSTGRES_URL') ||
                        process.env.POSTGRES_URL;
                    if (!pgUrl) {
                        console.error('POSTGRES_URL is not defined!');
                        throw new Error('POSTGRES_URL is not defined in environment variables');
                    }
                    console.log(`Connecting to PostgreSQL...`);
                    const pool = new pg_1.Pool({ connectionString: pgUrl });
                    const client = await pool.connect();
                    console.log('PostgreSQL connected successfully');
                    client.release();
                    return pool;
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [exports.PG_POOL],
    })
], PostgresModule);
//# sourceMappingURL=postgres.module.js.map