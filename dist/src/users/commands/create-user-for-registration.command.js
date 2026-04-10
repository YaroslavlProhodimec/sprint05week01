"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserForRegistrationCommand = void 0;
class CreateUserForRegistrationCommand {
    login;
    email;
    password;
    confirmationCode;
    expirationDate;
    constructor(login, email, password, confirmationCode, expirationDate) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.confirmationCode = confirmationCode;
        this.expirationDate = expirationDate;
    }
}
exports.CreateUserForRegistrationCommand = CreateUserForRegistrationCommand;
//# sourceMappingURL=create-user-for-registration.command.js.map