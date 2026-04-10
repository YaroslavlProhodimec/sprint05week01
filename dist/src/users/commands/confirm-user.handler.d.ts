import { ICommandHandler } from '@nestjs/cqrs';
import { ConfirmUserCommand } from './confirm-user.command';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class ConfirmUserHandler implements ICommandHandler<ConfirmUserCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: ConfirmUserCommand): Promise<UserDocument | null>;
}
