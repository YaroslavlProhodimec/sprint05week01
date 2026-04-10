import { IQueryHandler } from '@nestjs/cqrs';
import { FindAllSessionsByUserIdQuery } from './find-all-sessions-by-user-id.query';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
import type { DeviceSessionDocument } from '../../schemas/deviceSession.schema';
export declare class FindAllSessionsByUserIdHandler implements IQueryHandler<FindAllSessionsByUserIdQuery> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(query: FindAllSessionsByUserIdQuery): Promise<DeviceSessionDocument[]>;
}
