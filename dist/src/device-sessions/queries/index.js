"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSessionQueryHandlers = exports.FindAllSessionsByUserIdHandler = exports.FindAllSessionsByUserIdQuery = exports.FindSessionByDeviceIdHandler = exports.FindSessionByDeviceIdQuery = void 0;
const find_session_by_device_id_handler_1 = require("./find-session-by-device-id.handler");
Object.defineProperty(exports, "FindSessionByDeviceIdHandler", { enumerable: true, get: function () { return find_session_by_device_id_handler_1.FindSessionByDeviceIdHandler; } });
const find_all_sessions_by_user_id_handler_1 = require("./find-all-sessions-by-user-id.handler");
Object.defineProperty(exports, "FindAllSessionsByUserIdHandler", { enumerable: true, get: function () { return find_all_sessions_by_user_id_handler_1.FindAllSessionsByUserIdHandler; } });
var find_session_by_device_id_query_1 = require("./find-session-by-device-id.query");
Object.defineProperty(exports, "FindSessionByDeviceIdQuery", { enumerable: true, get: function () { return find_session_by_device_id_query_1.FindSessionByDeviceIdQuery; } });
var find_all_sessions_by_user_id_query_1 = require("./find-all-sessions-by-user-id.query");
Object.defineProperty(exports, "FindAllSessionsByUserIdQuery", { enumerable: true, get: function () { return find_all_sessions_by_user_id_query_1.FindAllSessionsByUserIdQuery; } });
exports.DeviceSessionQueryHandlers = [
    find_session_by_device_id_handler_1.FindSessionByDeviceIdHandler,
    find_all_sessions_by_user_id_handler_1.FindAllSessionsByUserIdHandler,
];
//# sourceMappingURL=index.js.map