import { ICommandHandler } from '@nestjs/cqrs';
import { SetRecoveryCodeCommand } from './set-recovery-code.command';
import { UsersRepository } from '../users-sql.repository';
export declare class SetRecoveryCodeHandler implements ICommandHandler<SetRecoveryCodeCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: SetRecoveryCodeCommand): Promise<boolean>;
}
