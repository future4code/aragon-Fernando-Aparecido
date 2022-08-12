import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ICreatePostInputDTO, IDeletePostInputDTO, IEditPostInputDTO, IGetPostsInputDTO } from "../models/Post";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input: IGetPostsInputDTO = {
                token: req.headers.authorization,
                search: req.query.search as string,
                order: req.query.order as string,
                sort: req.query.sort as string,
                limit: req.query.limit as string,
                page: req.query.page as string
            }
            const response = await this.postBusiness.getPosts(input)
            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input: ICreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }
            const response = await this.postBusiness.createPost(input)
            res.status(201).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input: IEditPostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }
            const response = await this.postBusiness.editPost(input)
            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: IDeletePostInputDTO = {
                token: req.headers.authorization,
                idToDelete: req.params.idToDelete
            }
            const response = await this.postBusiness.deletePost(input)
            res.status(200).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}
