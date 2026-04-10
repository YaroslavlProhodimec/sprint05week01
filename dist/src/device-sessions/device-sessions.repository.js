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
exports.DeviceSessionsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const deviceSession_schema_1 = require("../schemas/deviceSession.schema");
let DeviceSessionsRepository = class DeviceSessionsRepository {
    sessionModel;
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async createSession(userId, deviceId, issuedAt, expirationDate, ip, deviceName) {
        const session = new this.sessionModel({
            userId,
            deviceId,
            issuedAt,
            expirationDate,
            lastActiveDate: issuedAt,
            ip,
            deviceName,
        });
        return session.save();
    }
    async findByDeviceId(deviceId) {
        return this.sessionModel.findOne({ deviceId }).exec();
    }
    async updateSession(deviceId, issuedAt, expirationDate) {
        const result = await this.sessionModel
            .updateOne({ deviceId }, { $set: { issuedAt, expirationDate, lastActiveDate: issuedAt } })
            .exec();
        return (result.modifiedCount ?? 0) >= 1;
    }
    async deleteByDeviceId(deviceId) {
        const result = await this.sessionModel.deleteOne({ deviceId }).exec();
        return result.deletedCount > 0;
    }
    async findAllByUserId(userId) {
        return this.sessionModel.find({ userId }).exec();
    }
    async deleteAllByUserIdExceptDeviceId(userId, deviceId) {
        await this.sessionModel.deleteMany({ userId, deviceId: { $ne: deviceId } }).exec();
    }
};
exports.DeviceSessionsRepository = DeviceSessionsRepository;
exports.DeviceSessionsRepository = DeviceSessionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(deviceSession_schema_1.DeviceSession.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeviceSessionsRepository);
//# sourceMappingURL=device-sessions.repository.js.map