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
exports.PostsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../schemas/post.schema");
const uuid_1 = require("uuid");
const mapper_1 = require("../types/post/mapper");
const blogs_repository_1 = require("../blogs/blogs.repository");
const post_likes_repository_1 = require("../post-likes/post-likes.repository");
const users_sql_repository_1 = require("../users/users-sql.repository");
let PostsRepository = class PostsRepository {
    postModel;
    blogsRepository;
    postLikesRepository;
    usersRepository;
    constructor(postModel, blogsRepository, postLikesRepository, usersRepository) {
        this.postModel = postModel;
        this.blogsRepository = blogsRepository;
        this.postLikesRepository = postLikesRepository;
        this.usersRepository = usersRepository;
    }
    getMapperDeps() {
        return {
            postLikesRepository: this.postLikesRepository,
            usersRepository: this.usersRepository,
        };
    }
    async getPosts(query = {}, userId) {
        const { sortBy = 'createdAt', sortDirection = 'desc', pageNumber = 1, pageSize = 10 } = query;
        const posts = await this.postModel
            .find({}, { _id: 0 })
            .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const totalCount = await this.postModel.countDocuments({});
        const pagesCount = Math.ceil(totalCount / pageSize);
        const deps = this.getMapperDeps();
        const items = await Promise.all(posts.map((post) => {
            const postObj = post.toObject({ versionKey: false });
            return (0, mapper_1.postMapper)(postObj, userId, deps);
        }));
        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items,
        };
    }
    async getPostById(id, userId) {
        const post = await this.postModel
            .findOne({ id }, { _id: 0 })
            .exec();
        if (!post)
            return null;
        const postObj = post.toObject({ versionKey: false });
        return (0, mapper_1.postMapper)(postObj, userId, this.getMapperDeps());
    }
    async createPost(createPostDto) {
        const blog = await this.blogsRepository.getBlogById(createPostDto.blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        const postData = {
            id: (0, uuid_1.v4)(),
            ...createPostDto,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        };
        const newPost = new this.postModel(postData);
        await newPost.save();
        const postObj = newPost.toObject({
            versionKey: false,
        });
        return (0, mapper_1.postMapper)(postObj, undefined, this.getMapperDeps());
    }
    async updatePost(id, updatePostDto) {
        const updateData = { ...updatePostDto };
        if (updatePostDto.blogId) {
            const blog = await this.blogsRepository.getBlogById(updatePostDto.blogId);
            if (!blog) {
                throw new Error('Blog not found');
            }
            updateData.blogName = blog.name;
        }
        const result = await this.postModel
            .updateOne({ id }, updateData)
            .exec();
        return result.matchedCount === 1;
    }
    async deletePost(id) {
        const result = await this.postModel
            .deleteOne({ id })
            .exec();
        return result.deletedCount === 1;
    }
    async getBlogPosts(blogId, query, userId) {
        const { sortBy = 'createdAt', sortDirection = 'desc', pageNumber = 1, pageSize = 10 } = query;
        const posts = await this.postModel
            .find({ blogId }, { _id: 0 })
            .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const totalCount = await this.postModel.countDocuments({ blogId });
        const pagesCount = Math.ceil(totalCount / pageSize);
        const deps = this.getMapperDeps();
        const items = await Promise.all(posts.map((post) => {
            const postObj = post.toObject({ versionKey: false });
            return (0, mapper_1.postMapper)(postObj, userId, deps);
        }));
        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items,
        };
    }
    async createPostForBlog(blogId, postData) {
        const blog = await this.blogsRepository.getBlogById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        return this.createPost({
            ...postData,
            blogId
        });
    }
};
exports.PostsRepository = PostsRepository;
exports.PostsRepository = PostsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => blogs_repository_1.BlogsRepository))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        blogs_repository_1.BlogsRepository,
        post_likes_repository_1.PostLikesRepository,
        users_sql_repository_1.UsersRepository])
], PostsRepository);
//# sourceMappingURL=posts.repository.js.map