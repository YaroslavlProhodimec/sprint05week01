import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users.controller';
import { UsersRepository } from './users-sql.repository';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UsersRepository, ...CommandHandlers, ...QueryHandlers],
  exports: [UsersRepository, CqrsModule],
})
export class UsersModule {}
