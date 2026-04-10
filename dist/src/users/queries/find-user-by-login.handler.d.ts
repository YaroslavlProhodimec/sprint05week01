import { IQueryHandler } from '@nestjs/cqrs';
import { FindUserByLoginQuery } from './find-user-by-login.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class FindUserByLoginHandler implements IQueryHandler<FindUserByLoginQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: FindUserByLoginQuery): Promise<UserDocument | null>;
}
