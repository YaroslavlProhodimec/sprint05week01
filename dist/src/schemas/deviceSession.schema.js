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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionSchema = exports.DeviceSession = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DeviceSession = class DeviceSession {
    userId;
    deviceId;
    issuedAt;
    expirationDate;
    lastActiveDate;
    ip;
    deviceName;
};
exports.DeviceSession = DeviceSession;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeviceSession.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeviceSession.prototype, "deviceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DeviceSession.prototype, "issuedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DeviceSession.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DeviceSession.prototype, "lastActiveDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'unknown' }),
    __metadata("design:type", String)
], DeviceSession.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'unknown' }),
    __metadata("design:type", String)
], DeviceSession.prototype, "deviceName", void 0);
exports.DeviceSession = DeviceSession = __decorate([
    (0, mongoose_1.Schema)()
], DeviceSession);
exports.DeviceSessionSchema = mongoose_1.SchemaFactory.createForClass(DeviceSession);
exports.DeviceSessionSchema.index({ deviceId: 1 }, { unique: true });
exports.DeviceSessionSchema.index({ userId: 1 });
//# sourceMappingURL=deviceSession.schema.js.map