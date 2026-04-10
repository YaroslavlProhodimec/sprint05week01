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
exports.DeleteUserHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const delete_user_command_1 = require("./delete-user.command");
const users_sql_repository_1 = require("../users-sql.repository");
let DeleteUserHandler = class DeleteUserHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(command) {
        return this.usersRepository.deleteUser(command.userId);
    }
};
exports.DeleteUserHandler = DeleteUserHandler;
exports.DeleteUserHandler = DeleteUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_user_command_1.DeleteUserCommand),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], DeleteUserHandler);
//# sourceMappingURL=delete-user.handler.js.map