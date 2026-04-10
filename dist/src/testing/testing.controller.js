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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pg_1 = require("pg");
const blog_schema_1 = require("../schemas/blog.schema");
const post_schema_1 = require("../schemas/post.schema");
const postLike_schema_1 = require("../schemas/postLike.schema");
const comment_schema_1 = require("../schemas/comment.schema");
const commentLike_schema_1 = require("../schemas/commentLike.schema");
const postgres_module_1 = require("../database/postgres.module");
let TestingController = class TestingController {
    blogModel;
    postModel;
    postLikeModel;
    commentModel;
    commentLikeModel;
    pool;
    constructor(blogModel, postModel, postLikeModel, commentModel, commentLikeModel, pool) {
        this.blogModel = blogModel;
        this.postModel = postModel;
        this.postLikeModel = postLikeModel;
        this.commentModel = commentModel;
        this.commentLikeModel = commentLikeModel;
        this.pool = pool;
    }
    async deleteAllData() {
        await Promise.all([
            this.blogModel.deleteMany({}),
            this.postModel.deleteMany({}),
            this.postLikeModel.deleteMany({}),
            this.commentModel.deleteMany({}),
            this.commentLikeModel.deleteMany({}),
            this.pool.query('DELETE FROM device_sessions'),
            this.pool.query('DELETE FROM users'),
        ]);
    }
};
exports.TestingController = TestingController;
__decorate([
    (0, common_1.Delete)('all-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "deleteAllData", null);
exports.TestingController = TestingController = __decorate([
    (0, common_1.Controller)('testing'),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(postLike_schema_1.PostLike.name)),
    __param(3, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(4, (0, mongoose_1.InjectModel)(commentLike_schema_1.CommentLike.name)),
    __param(5, (0, common_1.Inject)(postgres_module_1.PG_POOL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        pg_1.Pool])
], TestingController);
//# sourceMappingURL=testing.controller.js.map