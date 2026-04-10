import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { UsersRepository } from '../users-sql.repository';
export declare class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(query: GetAllUsersQuery): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            login: any;
            email: any;
            createdAt: any;
        }[];
    }>;
}
