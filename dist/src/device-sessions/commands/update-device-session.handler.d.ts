import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateDeviceSessionCommand } from './update-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
export declare class UpdateDeviceSessionHandler implements ICommandHandler<UpdateDeviceSessionCommand> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(command: UpdateDeviceSessionCommand): Promise<boolean>;
}
