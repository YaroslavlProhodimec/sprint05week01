import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateConfirmationCodeCommand } from './update-confirmation-code.command';
import { UsersRepository } from '../users-sql.repository';
export declare class UpdateConfirmationCodeHandler implements ICommandHandler<UpdateConfirmationCodeCommand> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(command: UpdateConfirmationCodeCommand): Promise<boolean>;
}
