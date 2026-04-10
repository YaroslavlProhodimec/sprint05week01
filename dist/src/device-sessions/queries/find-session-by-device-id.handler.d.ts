import { IQueryHandler } from '@nestjs/cqrs';
import { FindSessionByDeviceIdQuery } from './find-session-by-device-id.query';
import { DeviceSessionsRepository } from '../device-sessions-sql.repository';
import type { DeviceSessionDocument } from '../../schemas/deviceSession.schema';
export declare class FindSessionByDeviceIdHandler implements IQueryHandler<FindSessionByDeviceIdQuery> {
    private readonly sessionsRepo;
    constructor(sessionsRepo: DeviceSessionsRepository);
    execute(query: FindSessionByDeviceIdQuery): Promise<DeviceSessionDocument | null>;
}
