export declare class UpdateConfirmationCodeCommand {
    readonly userId: string;
    readonly confirmationCode: string;
    readonly expirationDate: Date;
    constructor(userId: string, confirmationCode: string, expirationDate: Date);
}
