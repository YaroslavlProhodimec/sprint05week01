export declare class UpdateDeviceSessionCommand {
    readonly deviceId: string;
    readonly issuedAt: Date;
    readonly expirationDate: Date;
    constructor(deviceId: string, issuedAt: Date, expirationDate: Date);
}
