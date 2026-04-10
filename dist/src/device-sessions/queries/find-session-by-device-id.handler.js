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
exports.FindSessionByDeviceIdHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const find_session_by_device_id_query_1 = require("./find-session-by-device-id.query");
const device_sessions_sql_repository_1 = require("../device-sessions-sql.repository");
let FindSessionByDeviceIdHandler = class FindSessionByDeviceIdHandler {
    sessionsRepo;
    constructor(sessionsRepo) {
        this.sessionsRepo = sessionsRepo;
    }
    async execute(query) {
        return this.sessionsRepo.findByDeviceId(query.deviceId);
    }
};
exports.FindSessionByDeviceIdHandler = FindSessionByDeviceIdHandler;
exports.FindSessionByDeviceIdHandler = FindSessionByDeviceIdHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_session_by_device_id_query_1.FindSessionByDeviceIdQuery),
    __metadata("design:paramtypes", [device_sessions_sql_repository_1.DeviceSessionsRepository])
], FindSessionByDeviceIdHandler);
//# sourceMappingURL=find-session-by-device-id.handler.js.map