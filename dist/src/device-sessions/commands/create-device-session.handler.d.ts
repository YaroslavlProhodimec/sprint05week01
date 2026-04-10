import { ICommandHandler } from '@nestjs/cqrs';
import { CreateDeviceSessionCommand } from './create-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
export declare class CreateDeviceSessionHandler implements ICommandHandler<CreateDeviceSessionCommand> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(command: CreateDeviceSessionCommand): Promise<any>;
}
