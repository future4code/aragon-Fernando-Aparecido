import { Router } from 'express'
import { userInfo } from 'os'
import { PizzaBusiness } from '../business/PizzaBusiness'
import { PizzaController } from '../controller/PizzaController'
import { PizzaDatabase } from '../database/PizzaDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const pizzaRouter = Router()

const pizzaController = new PizzaController(
    new PizzaBusiness(
        new PizzaDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

pizzaRouter.get("/", pizzaController.getPizza)
pizzaRouter.post("/", pizzaController.createPizza)
pizzaRouter.delete("/:id", pizzaController.deletePizza)

    pizzaRouter.get("/orders", pizzaController.getOrders)