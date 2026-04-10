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
exports.SetRecoveryCodeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const set_recovery_code_command_1 = require("./set-recovery-code.command");
const users_sql_repository_1 = require("../users-sql.repository");
let SetRecoveryCodeHandler = class SetRecoveryCodeHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        return this.usersRepository.setRecoveryCode(command.userId, command.recoveryCode, command.expirationDate);
    }
};
exports.SetRecoveryCodeHandler = SetRecoveryCodeHandler;
exports.SetRecoveryCodeHandler = SetRecoveryCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(set_recovery_code_command_1.SetRecoveryCodeCommand),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], SetRecoveryCodeHandler);
//# sourceMappingURL=set-recovery-code.handler.js.map