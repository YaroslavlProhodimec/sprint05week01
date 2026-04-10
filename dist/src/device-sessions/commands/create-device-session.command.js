"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeviceSessionCommand = void 0;
class CreateDeviceSessionCommand {
    userId;
    deviceId;
    issuedAt;
    expirationDate;
    ip;
    deviceName;
    constructor(userId, deviceId, issuedAt, expirationDate, ip, deviceName) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.issuedAt = issuedAt;
        this.expirationDate = expirationDate;
        this.ip = ip;
        this.deviceName = deviceName;
    }
}
exports.CreateDeviceSessionCommand = CreateDeviceSessionCommand;
//# sourceMappingURL=create-device-session.command.js.map