"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionsModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const device_sessions_sql_repository_1 = require("./device-sessions-sql.repository");
const commands_1 = require("./commands");
const queries_1 = require("./queries");
let DeviceSessionsModule = class DeviceSessionsModule {
};
exports.DeviceSessionsModule = DeviceSessionsModule;
exports.DeviceSessionsModule = DeviceSessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
        ],
        providers: [
            device_sessions_sql_repository_1.DeviceSessionsRepository,
            ...commands_1.DeviceSessionCommandHandlers,
            ...queries_1.DeviceSessionQueryHandlers,
        ],
        exports: [device_sessions_sql_repository_1.DeviceSessionsRepository, cqrs_1.CqrsModule],
    })
], DeviceSessionsModule);
//# sourceMappingURL=device-sessions.module.js.map