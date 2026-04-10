import { IQueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: FindUserByIdQuery): Promise<UserDocument | null>;
}
