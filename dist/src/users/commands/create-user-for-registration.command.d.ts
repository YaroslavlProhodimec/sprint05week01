export declare class CreateUserForRegistrationCommand {
    readonly login: string;
    readonly email: string;
    readonly password: string;
    readonly confirmationCode: string;
    readonly expirationDate: Date;
    constructor(login: string, email: string, password: string, confirmationCode: string, expirationDate: Date);
}
