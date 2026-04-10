import { ICommandHandler } from '@nestjs/cqrs';
import { CreateUserForRegistrationCommand } from './create-user-for-registration.command';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class CreateUserForRegistrationHandler implements ICommandHandler<CreateUserForRegistrationCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: CreateUserForRegistrationCommand): Promise<UserDocument>;
}
