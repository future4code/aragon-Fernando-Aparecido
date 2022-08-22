import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseError } from "../errors/BaseError";
import { IBuyTicketInputDTO, ICreateShowInputDTO, IDeleteInputDTO, IDeleteTicketInputDTO, IGetShowInputDTO } from "../models/Show";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public createShow = async (req: Request, res: Response) => {
        try {
            const input: ICreateShowInputDTO = {
                token: req.headers.authorization,
                band: req.body.band,
                startsAt: req.body.startsAt
            }
            const response = await this.showBusiness.createShow(input)
            res.status(201).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao criar show" })
        }
    }

    public getShow = async (req: Request, res: Response) => {
        try {
            const response = await this.showBusiness.getShows()
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar shows" })
        }
    }

    public buyTicket = async (req: Request, res: Response) => {
        try {
            const input: IBuyTicketInputDTO = {
                token: req.headers.authorization,
                showId: req.params.id
            }
            const response = await this.showBusiness.buyTicket(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao reservar ingresso" })
        }
    }

    public deleteTicket = async (req: Request, res: Response) => {
        try {
            const input: IDeleteTicketInputDTO = {
                token: req.headers.authorization,
                showId: req.params.id
            }
            const response = await this.showBusiness.deleteTicket(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao cancelar ingresso" })
        }
    }

    public deleteShow = async (req: Request, res: Response) => {
        try {
            const input: IDeleteInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }
            const response = await this.showBusiness.deleteShow(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao deletar show" })
        }
    }
}
