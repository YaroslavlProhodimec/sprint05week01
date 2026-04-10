export declare class CreateDeviceSessionCommand {
    readonly userId: string;
    readonly deviceId: string;
    readonly issuedAt: Date;
    readonly expirationDate: Date;
    readonly ip: string;
    readonly deviceName: string;
    constructor(userId: string, deviceId: string, issuedAt: Date, expirationDate: Date, ip: string, deviceName: string);
}
