"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeviceSessionCommand = void 0;
class UpdateDeviceSessionCommand {
    deviceId;
    issuedAt;
    expirationDate;
    constructor(deviceId, issuedAt, expirationDate) {
        this.deviceId = deviceId;
        this.issuedAt = issuedAt;
        this.expirationDate = expirationDate;
    }
}
exports.UpdateDeviceSessionCommand = UpdateDeviceSessionCommand;
//# sourceMappingURL=update-device-session.command.js.map