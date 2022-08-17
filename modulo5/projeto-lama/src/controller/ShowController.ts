import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { RequestError } from "../errors/RequestError";
import { ICreateShowInputDTO } from "../models/Show";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public createShow = async (req: Request, res: Response) => {
        try {
            const input: ICreateShowInputDTO = {
                token: req.headers.authorization,
                band: req.body.band,
                starts_at: new Date()
            }

            const Response = await this.showBusiness.createShow(input)
            res.status(201).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao criar show" })
        }
    }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input: IGetPostsInputDTO = {
                token: req.headers.authorization
            }

            const response = await this.postBusiness.getPosts(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao buscar posts" })
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: IDeletePostInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }

            const response = await this.postBusiness.deletePost(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao deletar post" })
        }
    }

    public addLike = async (req: Request, res: Response) => {
        try {
            const input: IAddLikeInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }

            const response = await this.postBusiness.addLike(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao dar like em post" })
        }
    }

    public removeLike = async (req: Request, res: Response) => {
        try {
            const input: IRemoveLikeInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id
            }

            const response = await this.postBusiness.removeLike(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado ao remover like de post" })
        }
    }

}