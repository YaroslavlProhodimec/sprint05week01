import { IQueryHandler } from '@nestjs/cqrs';
import { FindUserByEmailQuery } from './find-user-by-email.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: FindUserByEmailQuery): Promise<UserDocument | null>;
}
