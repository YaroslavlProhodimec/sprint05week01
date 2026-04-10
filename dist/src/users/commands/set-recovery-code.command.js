"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRecoveryCodeCommand = void 0;
class SetRecoveryCodeCommand {
    userId;
    recoveryCode;
    expirationDate;
    constructor(userId, recoveryCode, expirationDate) {
        this.userId = userId;
        this.recoveryCode = recoveryCode;
        this.expirationDate = expirationDate;
    }
}
exports.SetRecoveryCodeCommand = SetRecoveryCodeCommand;
//# sourceMappingURL=set-recovery-code.command.js.map