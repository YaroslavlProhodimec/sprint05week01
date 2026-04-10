"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const testing_controller_1 = require("./testing.controller");
const blog_schema_1 = require("../schemas/blog.schema");
const post_schema_1 = require("../schemas/post.schema");
const postLike_schema_1 = require("../schemas/postLike.schema");
const comment_schema_1 = require("../schemas/comment.schema");
const commentLike_schema_1 = require("../schemas/commentLike.schema");
let TestingModule = class TestingModule {
};
exports.TestingModule = TestingModule;
exports.TestingModule = TestingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: postLike_schema_1.PostLike.name, schema: postLike_schema_1.PostLikeSchema },
                { name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema },
                { name: commentLike_schema_1.CommentLike.name, schema: commentLike_schema_1.CommentLikeSchema },
            ]),
        ],
        controllers: [testing_controller_1.TestingController],
    })
], TestingModule);
//# sourceMappingURL=testing.module.js.map