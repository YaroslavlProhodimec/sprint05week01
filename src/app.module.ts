// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { PostgresModule } from './database/postgres.module';
import { PgInitService } from './database/pg-init.service';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TestingModule } from './testing/testing.module';
import { DeviceSessionsModule } from './device-sessions/device-sessions.module';
import { SecurityDevicesModule } from './security-devices/security-devices.module';
import { setBlogsRepository } from './repositories/blog-repository';
import { BlogsRepository } from './blogs/blogs.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.VERCEL ? undefined : '.env',
      ignoreEnvFile: !!process.env.VERCEL,
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,  // 10 секунд
      limit: 5,    // 5 запросов за 10 секунд
    }]),
    DatabaseModule,
    PostgresModule,
    BlogsModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    DeviceSessionsModule,
    SecurityDevicesModule,
    TestingModule,
  ],
  providers: [PgInitService],
})
export class AppModule implements OnModuleInit {
  constructor(private blogsRepository: BlogsRepository) {}

  onModuleInit() {
    // Инициализируем BlogRepository для валидаторов
    setBlogsRepository(this.blogsRepository);
  }
}