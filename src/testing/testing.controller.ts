// src/testing/testing.controller.ts
import { Controller, Delete, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pool } from 'pg';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { PostLike, PostLikeDocument } from '../schemas/postLike.schema';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { CommentLike, CommentLikeDocument } from '../schemas/commentLike.schema';
import { PG_POOL } from '../database/postgres.module';

@Controller('testing')
export class TestingController {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
    @Inject(PG_POOL) private pool: Pool,
  ) {}

  @Delete('all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllData() {
    await Promise.all([
      // MongoDB collections
      this.blogModel.deleteMany({}),
      this.postModel.deleteMany({}),
      this.postLikeModel.deleteMany({}),
      this.commentModel.deleteMany({}),
      this.commentLikeModel.deleteMany({}),
      // SQL tables
      this.pool.query('DELETE FROM device_sessions'),
      this.pool.query('DELETE FROM users'),
    ]);
  }
}
