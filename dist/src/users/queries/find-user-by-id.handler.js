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
exports.FindUserByIdHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const find_user_by_id_query_1 = require("./find-user-by-id.query");
const users_sql_repository_1 = require("../users-sql.repository");
let FindUserByIdHandler = class FindUserByIdHandler {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(query) {
        return this.usersRepository.findById(query.userId);
    }
};
exports.FindUserByIdHandler = FindUserByIdHandler;
exports.FindUserByIdHandler = FindUserByIdHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_user_by_id_query_1.FindUserByIdQuery),
    __metadata("design:paramtypes", [users_sql_repository_1.UsersRepository])
], FindUserByIdHandler);
//# sourceMappingURL=find-user-by-id.handler.js.map