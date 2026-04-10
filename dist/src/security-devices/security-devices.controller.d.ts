import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
export declare class SecurityDevicesController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    getAllDevices(req: Request): Promise<{
        ip: string;
        title: string;
        lastActiveDate: string;
        deviceId: string;
    }[]>;
    deleteAllExceptCurrent(req: Request): Promise<void>;
    deleteDevice(deviceId: string, req: Request): Promise<void>;
}
