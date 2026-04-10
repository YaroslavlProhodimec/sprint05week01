import { IQueryHandler } from '@nestjs/cqrs';
import { CheckCredentialsQuery } from './check-credentials.query';
import { UsersRepository } from '../users-sql.repository';
import type { UserDocument } from '../../schemas/user.schema';
export declare class CheckCredentialsHandler implements IQueryHandler<CheckCredentialsQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: CheckCredentialsQuery): Promise<UserDocument | null>;
}
