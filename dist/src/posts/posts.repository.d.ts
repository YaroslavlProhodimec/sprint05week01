import { Model } from 'mongoose';
import { PostDocument } from '../schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from '../dto/postsDTO/create-post.dto';
import { OutputPostType } from '../types/post/output';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostLikesRepository } from '../post-likes/post-likes.repository';
import { UsersRepository } from '../users/users-sql.repository';
export declare class PostsRepository {
    private postModel;
    private blogsRepository;
    private postLikesRepository;
    private usersRepository;
    constructor(postModel: Model<PostDocument>, blogsRepository: BlogsRepository, postLikesRepository: PostLikesRepository, usersRepository: UsersRepository);
    private getMapperDeps;
    getPosts(query?: any, userId?: string): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            title: any;
            shortDescription: any;
            content: any;
            blogId: any;
            blogName: any;
            createdAt: string;
            extendedLikesInfo: {
                likesCount: number;
                dislikesCount: number;
                myStatus: "Like" | "Dislike" | "None";
                newestLikes: {
                    addedAt: string;
                    userId: string;
                    login: string;
                }[];
            };
        }[];
    }>;
    getPostById(id: string, userId?: string): Promise<OutputPostType | null>;
    createPost(createPostDto: CreatePostDto): Promise<OutputPostType>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<boolean>;
    deletePost(id: string): Promise<boolean>;
    getBlogPosts(blogId: string, query: any, userId?: string): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            title: any;
            shortDescription: any;
            content: any;
            blogId: any;
            blogName: any;
            createdAt: string;
            extendedLikesInfo: {
                likesCount: number;
                dislikesCount: number;
                myStatus: "Like" | "Dislike" | "None";
                newestLikes: {
                    addedAt: string;
                    userId: string;
                    login: string;
                }[];
            };
        }[];
    }>;
    createPostForBlog(blogId: string, postData: CreatePostDto): Promise<OutputPostType>;
}
