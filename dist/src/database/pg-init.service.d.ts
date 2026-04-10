import { OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
export declare class PgInitService implements OnModuleInit {
    private pool;
    constructor(pool: Pool);
    onModuleInit(): Promise<void>;
}
