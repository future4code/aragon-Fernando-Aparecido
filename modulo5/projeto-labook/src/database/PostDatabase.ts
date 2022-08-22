import { IPostDB, Post } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "Labook_Posts"
    public static TABLE_LIKES = "Labook_Likes"
    public static TABLE_ = "_"

    public getPosts = async (
        search: string,
        sort: string,
        limit: number,
        offset: number
    ) => {
        const postsDB: IPostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where(`title`, "LIKE", `%${search}%`)
            .orderBy(`updated_at`, sort)
            .limit(limit)
            .offset(offset)
        return postsDB
    }

    public createPost = async (post: Post) => {
        const postDB: IPostDB = {
            id: post.getId(),
            content: post.getContent(),
            user_id: post.getUserId(),
        }
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public findPostById = async (id: string) => {
        const postDB: IPostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })
        return postDB[0]
    }

    public updatePost = async (post: Post) => {
        const postDB: IPostDB = {
            id: post.getId(),
            content: post.getContent(),
            user_id: post.getUserId()
        }
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public deletePostById = async (id: string) => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public deletePostsFromUser = async (userId: string) => {
        const postsDB: IPostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ creator_id: userId })

        for (let postDB of postsDB) {
            await this.deletePostById(postDB.id)
        }
    }
}
