"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = exports.SetNewPasswordHandler = exports.SetNewPasswordCommand = exports.SetRecoveryCodeHandler = exports.SetRecoveryCodeCommand = exports.UpdateConfirmationCodeHandler = exports.UpdateConfirmationCodeCommand = exports.ConfirmUserHandler = exports.ConfirmUserCommand = exports.CreateUserForRegistrationHandler = exports.CreateUserForRegistrationCommand = exports.DeleteUserHandler = exports.DeleteUserCommand = exports.CreateUserHandler = exports.CreateUserCommand = void 0;
const create_user_handler_1 = require("./create-user.handler");
Object.defineProperty(exports, "CreateUserHandler", { enumerable: true, get: function () { return create_user_handler_1.CreateUserHandler; } });
const delete_user_handler_1 = require("./delete-user.handler");
Object.defineProperty(exports, "DeleteUserHandler", { enumerable: true, get: function () { return delete_user_handler_1.DeleteUserHandler; } });
const create_user_for_registration_handler_1 = require("./create-user-for-registration.handler");
Object.defineProperty(exports, "CreateUserForRegistrationHandler", { enumerable: true, get: function () { return create_user_for_registration_handler_1.CreateUserForRegistrationHandler; } });
const confirm_user_handler_1 = require("./confirm-user.handler");
Object.defineProperty(exports, "ConfirmUserHandler", { enumerable: true, get: function () { return confirm_user_handler_1.ConfirmUserHandler; } });
const update_confirmation_code_handler_1 = require("./update-confirmation-code.handler");
Object.defineProperty(exports, "UpdateConfirmationCodeHandler", { enumerable: true, get: function () { return update_confirmation_code_handler_1.UpdateConfirmationCodeHandler; } });
const set_recovery_code_handler_1 = require("./set-recovery-code.handler");
Object.defineProperty(exports, "SetRecoveryCodeHandler", { enumerable: true, get: function () { return set_recovery_code_handler_1.SetRecoveryCodeHandler; } });
const set_new_password_handler_1 = require("./set-new-password.handler");
Object.defineProperty(exports, "SetNewPasswordHandler", { enumerable: true, get: function () { return set_new_password_handler_1.SetNewPasswordHandler; } });
var create_user_command_1 = require("./create-user.command");
Object.defineProperty(exports, "CreateUserCommand", { enumerable: true, get: function () { return create_user_command_1.CreateUserCommand; } });
var delete_user_command_1 = require("./delete-user.command");
Object.defineProperty(exports, "DeleteUserCommand", { enumerable: true, get: function () { return delete_user_command_1.DeleteUserCommand; } });
var create_user_for_registration_command_1 = require("./create-user-for-registration.command");
Object.defineProperty(exports, "CreateUserForRegistrationCommand", { enumerable: true, get: function () { return create_user_for_registration_command_1.CreateUserForRegistrationCommand; } });
var confirm_user_command_1 = require("./confirm-user.command");
Object.defineProperty(exports, "ConfirmUserCommand", { enumerable: true, get: function () { return confirm_user_command_1.ConfirmUserCommand; } });
var update_confirmation_code_command_1 = require("./update-confirmation-code.command");
Object.defineProperty(exports, "UpdateConfirmationCodeCommand", { enumerable: true, get: function () { return update_confirmation_code_command_1.UpdateConfirmationCodeCommand; } });
var set_recovery_code_command_1 = require("./set-recovery-code.command");
Object.defineProperty(exports, "SetRecoveryCodeCommand", { enumerable: true, get: function () { return set_recovery_code_command_1.SetRecoveryCodeCommand; } });
var set_new_password_command_1 = require("./set-new-password.command");
Object.defineProperty(exports, "SetNewPasswordCommand", { enumerable: true, get: function () { return set_new_password_command_1.SetNewPasswordCommand; } });
exports.CommandHandlers = [
    create_user_handler_1.CreateUserHandler,
    delete_user_handler_1.DeleteUserHandler,
    create_user_for_registration_handler_1.CreateUserForRegistrationHandler,
    confirm_user_handler_1.ConfirmUserHandler,
    update_confirmation_code_handler_1.UpdateConfirmationCodeHandler,
    set_recovery_code_handler_1.SetRecoveryCodeHandler,
    set_new_password_handler_1.SetNewPasswordHandler,
];
//# sourceMappingURL=index.js.map