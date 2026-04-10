import { IQueryHandler } from '@nestjs/cqrs';
import { FindUserByConfirmationCodeQuery } from './find-user-by-confirmation-code.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class FindUserByConfirmationCodeHandler implements IQueryHandler<FindUserByConfirmationCodeQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: FindUserByConfirmationCodeQuery): Promise<UserDocument | null>;
}
