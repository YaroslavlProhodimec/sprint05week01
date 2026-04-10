export declare class SetRecoveryCodeCommand {
    readonly userId: string;
    readonly recoveryCode: string;
    readonly expirationDate: Date;
    constructor(userId: string, recoveryCode: string, expirationDate: Date);
}
