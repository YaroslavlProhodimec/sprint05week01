import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const PG_POOL = 'PG_POOL';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_POOL,
      useFactory: async (configService: ConfigService) => {
        const pgUrl =
          configService.get<string>('POSTGRES_URL') ||
          process.env.POSTGRES_URL;

        if (!pgUrl) {
          console.error('POSTGRES_URL is not defined!');
          throw new Error(
            'POSTGRES_URL is not defined in environment variables',
          );
        }

        console.log(`Connecting to PostgreSQL...`);

        const pool = new Pool({ connectionString: pgUrl });

        // Test connection
        const client = await pool.connect();
        console.log('PostgreSQL connected successfully');
        client.release();

        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: [PG_POOL],
})
export class PostgresModule {}
