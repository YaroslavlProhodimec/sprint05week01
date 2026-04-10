// src/testing/testing.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingController } from './testing.controller';
import { Blog, BlogSchema } from '../schemas/blog.schema';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostLike, PostLikeSchema } from '../schemas/postLike.schema';
import { Comment, CommentSchema } from '../schemas/comment.schema';
import { CommentLike, CommentLikeSchema } from '../schemas/commentLike.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: PostLike.name, schema: PostLikeSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: CommentLike.name, schema: CommentLikeSchema },
    ]),
  ],
  controllers: [TestingController],
})
export class TestingModule {}
