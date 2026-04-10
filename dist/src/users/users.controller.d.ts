import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getUsers(query: any): Promise<any>;
    createUser(dto: CreateUserDto): Promise<any>;
    deleteUser(id: string): Promise<void>;
}
