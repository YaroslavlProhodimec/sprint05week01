"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityDevicesModule = void 0;
const common_1 = require("@nestjs/common");
const security_devices_controller_1 = require("./security-devices.controller");
const device_sessions_module_1 = require("../device-sessions/device-sessions.module");
const auth_module_1 = require("../auth/auth.module");
let SecurityDevicesModule = class SecurityDevicesModule {
};
exports.SecurityDevicesModule = SecurityDevicesModule;
exports.SecurityDevicesModule = SecurityDevicesModule = __decorate([
    (0, common_1.Module)({
        imports: [device_sessions_module_1.DeviceSessionsModule, auth_module_1.AuthModule],
        controllers: [security_devices_controller_1.SecurityDevicesController],
    })
], SecurityDevicesModule);
//# sourceMappingURL=security-devices.module.js.map