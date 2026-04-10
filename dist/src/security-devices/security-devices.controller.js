"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityDevicesController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const refresh_token_guard_1 = require("../auth/guards/refresh-token.guard");
const queries_1 = require("../device-sessions/queries");
const queries_2 = require("../device-sessions/queries");
const commands_1 = require("../device-sessions/commands");
let SecurityDevicesController = class SecurityDevicesController {
    commandBus;
    queryBus;
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async getAllDevices(req) {
        const { userId } = req.user;
        const sessions = await this.queryBus.execute(new queries_1.FindAllSessionsByUserIdQuery(userId));
        return sessions.map((s) => ({
            ip: s.ip,
            title: s.deviceName,
            lastActiveDate: s.lastActiveDate.toISOString(),
            deviceId: s.deviceId,
        }));
    }
    async deleteAllExceptCurrent(req) {
        const { userId, deviceId } = req.user;
        await this.commandBus.execute(new commands_1.DeleteAllSessionsExceptCurrentCommand(userId, deviceId));
    }
    async deleteDevice(deviceId, req) {
        const { userId } = req.user;
        const session = await this.queryBus.execute(new queries_2.FindSessionByDeviceIdQuery(deviceId));
        if (!session) {
            throw new common_1.NotFoundException('Device session not found');
        }
        if (session.userId !== userId) {
            throw new common_1.ForbiddenException('Not your device');
        }
        await this.commandBus.execute(new commands_1.DeleteDeviceSessionCommand(deviceId));
    }
};
exports.SecurityDevicesController = SecurityDevicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "getAllDevices", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "deleteAllExceptCurrent", null);
__decorate([
    (0, common_1.Delete)(':deviceId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "deleteDevice", null);
exports.SecurityDevicesController = SecurityDevicesController = __decorate([
    (0, common_1.Controller)('security/devices'),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], SecurityDevicesController);
//# sourceMappingURL=security-devices.controller.js.map