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
exports.UpdateConfirmationCodeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_confirmation_code_command_1 = require("./update-confirmation-code.command");
const users_sql_repository_1 = require("../users-sql.repository");
let UpdateConfirmationCodeHandler = class UpdateConfirmationCodeHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        return this.usersRepository.updateConfirmationCode(command.userId, command.confirmationCode, command.expirationDate);
    }
};
exports.UpdateConfirmationCodeHandler = UpdateConfirmationCodeHandler;
exports.UpdateConfirmationCodeHandler = UpdateConfirmationCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_confirmation_code_command_1.UpdateConfirmationCodeCommand),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], UpdateConfirmationCodeHandler);
//# sourceMappingURL=update-confirmation-code.handler.js.map