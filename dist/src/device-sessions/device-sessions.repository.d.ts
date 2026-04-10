import { Model } from 'mongoose';
import { DeviceSessionDocument } from '../schemas/deviceSession.schema';
export declare class DeviceSessionsRepository {
    private sessionModel;
    constructor(sessionModel: Model<DeviceSessionDocument>);
    createSession(userId: string, deviceId: string, issuedAt: Date, expirationDate: Date, ip: string, deviceName: string): Promise<DeviceSessionDocument>;
    findByDeviceId(deviceId: string): Promise<DeviceSessionDocument | null>;
    updateSession(deviceId: string, issuedAt: Date, expirationDate: Date): Promise<boolean>;
    deleteByDeviceId(deviceId: string): Promise<boolean>;
    findAllByUserId(userId: string): Promise<DeviceSessionDocument[]>;
    deleteAllByUserIdExceptDeviceId(userId: string, deviceId: string): Promise<void>;
}
