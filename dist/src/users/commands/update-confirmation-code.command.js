"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfirmationCodeCommand = void 0;
class UpdateConfirmationCodeCommand {
    userId;
    confirmationCode;
    expirationDate;
    constructor(userId, confirmationCode, expirationDate) {
        this.userId = userId;
        this.confirmationCode = confirmationCode;
        this.expirationDate = expirationDate;
    }
}
exports.UpdateConfirmationCodeCommand = UpdateConfirmationCodeCommand;
//# sourceMappingURL=update-confirmation-code.command.js.map