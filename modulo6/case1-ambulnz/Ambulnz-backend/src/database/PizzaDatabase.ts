import { IOrderDB, IPizzaDB, Pizza } from "../models/Pizza"
import { BaseDatabase } from "./BaseDatabase"

export class PizzaDatabase extends BaseDatabase {
    public static TABLE_PIZZAS = "Ambulnz_Pizzas"
    public static TABLE_ORDERS = "Ambulnz_Orders"

    public toPizzasDBModel = (pizza: Pizza): IPizzaDB => {
        const pizzaDB: IPizzaDB = {
            id: pizza.getId(),
            name: pizza.getName(),
            price: pizza.getPrice(),
            ingredients: pizza.getIngredients()
        }
        return pizzaDB
    }

    public getOrder = async (): Promise<IOrderDB[]> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_ORDERS)
            .select()
        return result
    }

    public getPizza = async (): Promise<IPizzaDB[]> => {
        const result: IPizzaDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .select()
        return result
    }

    public getOrderById = async (orderId: string): Promise<IOrderDB> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_ORDERS)
            .select()
            .where({ id: orderId })
        return result[0]
    }

    public createPizza = async (pizza: Pizza): Promise<void> => {
        const pizzaDB: IPizzaDB = {
            id: pizza.getId(),
            name: pizza.getName(),
            price: pizza.getPrice(),
            ingredients: pizza.getIngredients()
        }
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .insert(pizzaDB)
    }

    public findPizzaById = async (id: string): Promise<IPizzaDB | undefined> => {
        const pizzaDB: IPizzaDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .select()
            .where({ id })
        return pizzaDB[0]
    }

    public updatePizza = async (pizza: Pizza): Promise<void> => {
        const pizzaDB: IPizzaDB = {
            id: pizza.getId(),
            name: pizza.getName(),
            price: pizza.getPrice(),
            ingredients: pizza.getIngredients()
        }
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .update(pizzaDB)
            .where({ id: pizzaDB.id })
    }

    public deletePizzaById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .delete()
            .where({ id })
    }

    public findPizzaByName = async (name: string): Promise<IPizzaDB | undefined> => {
        const pizzaDB: IPizzaDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .select()
            .where({ name })
        return pizzaDB[0]
    }
}
