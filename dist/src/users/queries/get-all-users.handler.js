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
exports.GetAllUsersHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_all_users_query_1 = require("./get-all-users.query");
const users_sql_repository_1 = require("../users-sql.repository");
let GetAllUsersHandler = class GetAllUsersHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(query) {
        return this.usersRepository.getAllUsers(query.sortData);
    }
};
exports.GetAllUsersHandler = GetAllUsersHandler;
exports.GetAllUsersHandler = GetAllUsersHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_all_users_query_1.GetAllUsersQuery),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], GetAllUsersHandler);
//# sourceMappingURL=get-all-users.handler.js.map