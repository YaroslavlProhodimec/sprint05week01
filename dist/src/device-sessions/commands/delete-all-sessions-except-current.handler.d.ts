import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteAllSessionsExceptCurrentCommand } from './delete-all-sessions-except-current.command';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
export declare class DeleteAllSessionsExceptCurrentHandler implements ICommandHandler<DeleteAllSessionsExceptCurrentCommand> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(command: DeleteAllSessionsExceptCurrentCommand): Promise<void>;
}
