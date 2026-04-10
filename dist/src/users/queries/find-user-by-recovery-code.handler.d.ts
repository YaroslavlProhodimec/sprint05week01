import { IQueryHandler } from '@nestjs/cqrs';
import { FindUserByRecoveryCodeQuery } from './find-user-by-recovery-code.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class FindUserByRecoveryCodeHandler implements IQueryHandler<FindUserByRecoveryCodeQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: FindUserByRecoveryCodeQuery): Promise<UserDocument | null>;
}
