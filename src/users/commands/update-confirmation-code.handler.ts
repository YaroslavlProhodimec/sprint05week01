import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateConfirmationCodeCommand } from './update-confirmation-code.command';
import { UsersRepository } from '../users-sql.repository';

@CommandHandler(UpdateConfirmationCodeCommand)
export class UpdateConfirmationCodeHandler
  implements ICommandHandler<UpdateConfirmationCodeCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateConfirmationCodeCommand): Promise<boolean> {
    return this.usersRepository.updateConfirmationCode(
      command.userId,
      command.confirmationCode,
      command.expirationDate,
    );
  }
}
