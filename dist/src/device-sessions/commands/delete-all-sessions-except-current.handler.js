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
exports.DeleteAllSessionsExceptCurrentHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const delete_all_sessions_except_current_command_1 = require("./delete-all-sessions-except-current.command");
const device_sessions_sql_repository_1 = require("../device-sessions-sql.repository");
let DeleteAllSessionsExceptCurrentHandler = class DeleteAllSessionsExceptCurrentHandler {
    sessionsRepo;
    constructor(sessionsRepo) {
        this.sessionsRepo = sessionsRepo;
    }
    async execute(command) {
        await this.sessionsRepo.deleteAllByUserIdExceptDeviceId(command.userId, command.deviceId);
    }
};
exports.DeleteAllSessionsExceptCurrentHandler = DeleteAllSessionsExceptCurrentHandler;
exports.DeleteAllSessionsExceptCurrentHandler = DeleteAllSessionsExceptCurrentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_all_sessions_except_current_command_1.DeleteAllSessionsExceptCurrentCommand),
    __metadata("design:paramtypes", [device_sessions_sql_repository_1.DeviceSessionsRepository])
], DeleteAllSessionsExceptCurrentHandler);
//# sourceMappingURL=delete-all-sessions-except-current.handler.js.map