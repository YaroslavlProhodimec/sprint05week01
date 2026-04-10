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
exports.CreateUserForRegistrationHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const create_user_for_registration_command_1 = require("./create-user-for-registration.command");
const users_sql_repository_1 = require("../users-sql.repository");
let CreateUserForRegistrationHandler = class CreateUserForRegistrationHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        return this.usersRepository.createForRegistration(command.login, command.email, command.password, command.confirmationCode, command.expirationDate);
    }
};
exports.CreateUserForRegistrationHandler = CreateUserForRegistrationHandler;
exports.CreateUserForRegistrationHandler = CreateUserForRegistrationHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_user_for_registration_command_1.CreateUserForRegistrationCommand),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], CreateUserForRegistrationHandler);
//# sourceMappingURL=create-user-for-registration.handler.js.map