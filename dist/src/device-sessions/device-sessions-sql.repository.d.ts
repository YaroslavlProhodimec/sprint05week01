import { Pool } from 'pg';
export declare class DeviceSessionsRepository {
    private pool;
    constructor(pool: Pool);
    createSession(userId: string, deviceId: string, issuedAt: Date, expirationDate: Date, ip: string, deviceName: string): Promise<any>;
    findByDeviceId(deviceId: string): Promise<any | null>;
    updateSession(deviceId: string, issuedAt: Date, expirationDate: Date): Promise<boolean>;
    deleteByDeviceId(deviceId: string): Promise<boolean>;
    findAllByUserId(userId: string): Promise<any[]>;
    deleteAllByUserIdExceptDeviceId(userId: string, deviceId: string): Promise<void>;
}
