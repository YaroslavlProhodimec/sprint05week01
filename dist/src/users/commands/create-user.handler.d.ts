import { ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UsersRepository } from '../users-sql.repository';
export declare class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: CreateUserCommand): Promise<any>;
}
