import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DeviceSessionsRepository } from './device-sessions-sql.repository';
import { DeviceSessionCommandHandlers } from './commands';
import { DeviceSessionQueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    DeviceSessionsRepository,
    ...DeviceSessionCommandHandlers,
    ...DeviceSessionQueryHandlers,
  ],
  exports: [DeviceSessionsRepository, CqrsModule],
})
export class DeviceSessionsModule {}
