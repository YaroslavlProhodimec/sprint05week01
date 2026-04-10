import { Document } from 'mongoose';
export type DeviceSessionDocument = DeviceSession & Document;
export declare class DeviceSession {
    userId: string;
    deviceId: string;
    issuedAt: Date;
    expirationDate: Date;
    lastActiveDate: Date;
    ip: string;
    deviceName: string;
}
export declare const DeviceSessionSchema: import("mongoose").Schema<DeviceSession, import("mongoose").Model<DeviceSession, any, any, any, Document<unknown, any, DeviceSession, any> & DeviceSession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeviceSession, Document<unknown, {}, import("mongoose").FlatRecord<DeviceSession>, {}> & import("mongoose").FlatRecord<DeviceSession> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
