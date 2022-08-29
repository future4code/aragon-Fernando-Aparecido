import { PizzaDatabase } from "../database/PizzaDatabase"
import { ConflictError } from "../errors/ConflictError"
import { ForbiddenError } from "../errors/ForbiddenError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { ICreatePizzaInputDTO, ICreatePizzaOutputDTO, IDeletePizzaInputDTO, IDeletePizzaOutputDTO, IGetOrderByIdInputDTO, IGetOrderByIdOutputDTO, IGetOrderInputDTO, IGetOrderOutputDTO, IGetPizzaOutputDTO, IOrderDB, IPizzaDB, Order, Pizza } from "../models/Pizza"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PizzaBusiness {
    constructor(
        private pizzaDatabase: PizzaDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public createPizza = async (input: ICreatePizzaInputDTO) => {
        const { token, name, price, ingredients } = input
        if (!token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }
        const payload = this.authenticator.getTokenPayload(token)
        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError("Somente admins podem criar pizzas.")
        }
        if (typeof name !== "string") {
            throw new RequestError("Parâmetro name inválido: deve ser uma string")
        }
        if (name.length < 3) {
            throw new RequestError("Parâmetro name inválido: mínimo de 3 caracter")
        }
        const createdAt = new Date(Date.now())
        const pizzaAlreadyExists = await this.pizzaDatabase.findPizzaByName(name)
        if (pizzaAlreadyExists) {
            throw new ConflictError("Essa pizza já existe.")
        }
        const pizza = new Pizza(
            this.idGenerator.generate(),
            name,
            price,
            ingredients
        )
        await this.pizzaDatabase.createPizza(pizza)
        const response: ICreatePizzaOutputDTO = { message: "Pizza criada com sucesso.", pizza }
        return response
    }

    public getPizza = async (): Promise<IGetPizzaOutputDTO> => {
        const pizzaDB: IPizzaDB[] = await this.pizzaDatabase.getPizza()
        const pizzas = pizzaDB.map(pizzaDB => {
            return new Pizza(
                pizzaDB.id,
                pizzaDB.name,
                pizzaDB.price,
                pizzaDB.ingredients
            )
        })
        for (let pizza of pizzas) {
            const orders = await this.pizzaDatabase.getOrderById(pizza.getId())
            orders.valueOf
        }
        const response: IGetPizzaOutputDTO = {
            pizzas
        }
        return response
    }

    public deletePizza = async (input: IDeletePizzaInputDTO) => {
        const { token, id } = input
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Não autenticado")
        }
        const pizzaDB = await this.pizzaDatabase.findPizzaById(id)
        if (!pizzaDB) {
            throw new Error("Pizza não encontrada")
        }
        if (payload.role === USER_ROLES.NORMAL) {
            if (pizzaDB.id !== payload.id) {
                throw new Error("Sem autorização")
            }
        }
        await this.pizzaDatabase.deletePizzaById(id)
        const response: IDeletePizzaOutputDTO = {
            message: "Pizza excluida com sucesso"
        }
        return response
    }

    public getOrders = async (input: IGetOrderInputDTO): Promise<IGetOrderOutputDTO> => {
        const orderDB: IOrderDB[] = await this.pizzaDatabase.getOrder()

        if (!input.token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }
        const payload = this.authenticator.getTokenPayload(input.token)
        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError("Somente admins podem buscar pedidos.")
        }

        const orders = orderDB.map(orderDB => {
            return new Order(
                orderDB.id,
                orderDB.created_at,
                orderDB.pizza_id,
                orderDB.user_id,
                orderDB.total_price,
                orderDB.delivered_at
            )
        })
        const response: IGetOrderOutputDTO = { orders }
        return response
    }

    public getOrderById = async (input: IGetOrderByIdInputDTO): Promise<IGetOrderByIdOutputDTO> => {
        const orderDB: IOrderDB = await this.pizzaDatabase.getOrderById(input.orderId)
        const order = new Order(
            orderDB.id,
            orderDB.created_at,
            orderDB.pizza_id,
            orderDB.user_id,
            orderDB.total_price,
            orderDB.delivered_at
        )
        if (!input.token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }
        const payload = this.authenticator.getTokenPayload(input.token)
        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError("Somente admins podem buscar pedidos por id.")
        }
        const response: IGetOrderByIdOutputDTO = { order }
        return response
    }
}
