import { ICommandHandler } from '@nestjs/cqrs';
import { SetNewPasswordCommand } from './set-new-password.command';
import { UsersRepository } from '../users-sql.repository';
export declare class SetNewPasswordHandler implements ICommandHandler<SetNewPasswordCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: SetNewPasswordCommand): Promise<boolean>;
}
