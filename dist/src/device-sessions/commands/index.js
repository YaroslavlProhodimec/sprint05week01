"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionCommandHandlers = exports.DeleteAllSessionsExceptCurrentHandler = exports.DeleteAllSessionsExceptCurrentCommand = exports.DeleteDeviceSessionHandler = exports.DeleteDeviceSessionCommand = exports.UpdateDeviceSessionHandler = exports.UpdateDeviceSessionCommand = exports.CreateDeviceSessionHandler = exports.CreateDeviceSessionCommand = void 0;
const create_device_session_handler_1 = require("./create-device-session.handler");
Object.defineProperty(exports, "CreateDeviceSessionHandler", { enumerable: true, get: function () { return create_device_session_handler_1.CreateDeviceSessionHandler; } });
const update_device_session_handler_1 = require("./update-device-session.handler");
Object.defineProperty(exports, "UpdateDeviceSessionHandler", { enumerable: true, get: function () { return update_device_session_handler_1.UpdateDeviceSessionHandler; } });
const delete_device_session_handler_1 = require("./delete-device-session.handler");
Object.defineProperty(exports, "DeleteDeviceSessionHandler", { enumerable: true, get: function () { return delete_device_session_handler_1.DeleteDeviceSessionHandler; } });
const delete_all_sessions_except_current_handler_1 = require("./delete-all-sessions-except-current.handler");
Object.defineProperty(exports, "DeleteAllSessionsExceptCurrentHandler", { enumerable: true, get: function () { return delete_all_sessions_except_current_handler_1.DeleteAllSessionsExceptCurrentHandler; } });
var create_device_session_command_1 = require("./create-device-session.command");
Object.defineProperty(exports, "CreateDeviceSessionCommand", { enumerable: true, get: function () { return create_device_session_command_1.CreateDeviceSessionCommand; } });
var update_device_session_command_1 = require("./update-device-session.command");
Object.defineProperty(exports, "UpdateDeviceSessionCommand", { enumerable: true, get: function () { return update_device_session_command_1.UpdateDeviceSessionCommand; } });
var delete_device_session_command_1 = require("./delete-device-session.command");
Object.defineProperty(exports, "DeleteDeviceSessionCommand", { enumerable: true, get: function () { return delete_device_session_command_1.DeleteDeviceSessionCommand; } });
var delete_all_sessions_except_current_command_1 = require("./delete-all-sessions-except-current.command");
Object.defineProperty(exports, "DeleteAllSessionsExceptCurrentCommand", { enumerable: true, get: function () { return delete_all_sessions_except_current_command_1.DeleteAllSessionsExceptCurrentCommand; } });
exports.DeviceSessionCommandHandlers = [
    create_device_session_handler_1.CreateDeviceSessionHandler,
    update_device_session_handler_1.UpdateDeviceSessionHandler,
    delete_device_session_handler_1.DeleteDeviceSessionHandler,
    delete_all_sessions_except_current_handler_1.DeleteAllSessionsExceptCurrentHandler,
];
//# sourceMappingURL=index.js.map