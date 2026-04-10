import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UsersRepository } from '../users-sql.repository';
export declare class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: DeleteUserCommand): Promise<boolean>;
}
