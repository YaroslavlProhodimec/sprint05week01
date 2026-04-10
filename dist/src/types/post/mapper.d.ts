import type { PostLikesRepository } from '../../post-likes/post-likes.repository';
import type { UsersRepository } from '../../users/users-sql.repository';
export interface PostMapperDeps {
    postLikesRepository: PostLikesRepository;
    usersRepository: UsersRepository;
}
export declare function postMapper(post: any, userId: string | undefined, deps: PostMapperDeps): Promise<{
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
}>;
