import { Model } from 'mongoose';
import { Pool } from 'pg';
import { BlogDocument } from '../schemas/blog.schema';
import { PostDocument } from '../schemas/post.schema';
import { PostLikeDocument } from '../schemas/postLike.schema';
import { CommentDocument } from '../schemas/comment.schema';
import { CommentLikeDocument } from '../schemas/commentLike.schema';
export declare class TestingController {
    private blogModel;
    private postModel;
    private postLikeModel;
    private commentModel;
    private commentLikeModel;
    private pool;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>, postLikeModel: Model<PostLikeDocument>, commentModel: Model<CommentDocument>, commentLikeModel: Model<CommentLikeDocument>, pool: Pool);
    deleteAllData(): Promise<void>;
}
