import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteDeviceSessionCommand } from './delete-device-session.command';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
export declare class DeleteDeviceSessionHandler implements ICommandHandler<DeleteDeviceSessionCommand> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(command: DeleteDeviceSessionCommand): Promise<boolean>;
}
