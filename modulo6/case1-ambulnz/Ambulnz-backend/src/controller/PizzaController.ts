import { Request, Response } from "express"
import { PizzaBusiness } from "../business/PizzaBusiness"
import { BaseError } from "../errors/BaseError"
import { ICreatePizzaInputDTO, IDeletePizzaInputDTO, IGetOrderByIdInputDTO, IGetOrderInputDTO } from "../models/Pizza"

export class PizzaController {
    constructor(
        private pizzaBusiness: PizzaBusiness
    ) { }

    public createPizza = async (req: Request, res: Response) => {
        try {
            const input: ICreatePizzaInputDTO = {
                token: req.headers.authorization,
                name: req.body.name,
                price: req.body.price,
                ingredients: req.body.ingredients
            }
            const response = await this.pizzaBusiness.createPizza(input)
            res.status(201).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao criar show" })
        }
    }

    public getPizza = async (req: Request, res: Response) => {
        try {
            const response = await this.pizzaBusiness.getPizza()
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            console.log(error)
            res.status(500).send({ message: "Erro inesperado ao buscar shows" })
        }
    }

    public deletePizza = async (req: Request, res: Response) => {
        try {
            const input: IDeletePizzaInputDTO = {
                token: req.headers.authorization,
                id: req.params.id
            }
            const response = await this.pizzaBusiness.deletePizza(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao deletar pizza." })
        }
    }

    public getOrders = async (req: Request, res: Response) => {
        try {
            const input: IGetOrderInputDTO = {
                token: req.headers.authorization
            }
            const response = await this.pizzaBusiness.getOrders(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar shows" })
        }
    }

    public getOrderById = async (req: Request, res: Response) => {
        try {
            const input: IGetOrderByIdInputDTO = {
                orderId: req.params.id,
                token: req.headers.authorization
            }
            const response = await this.pizzaBusiness.getOrderById(input)
            res.status(200).send(response)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar shows" })
        }
    }
}
