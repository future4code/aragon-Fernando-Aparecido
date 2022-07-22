import { Request, Response } from "express";
import { TABLE_PRODUCTS } from "../database/tableNames";
import connection from "../database/connection";
import { Product } from "../models/Product";
export const createProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            throw new Error("nome ou preco incorreto.. 'name', 'price'")
        }

        const newproducts: Product = {
            id: Date.now().toString(),

            name,
            price,

        }

        await connection(TABLE_PRODUCTS)
            .insert({
                id: newproducts.id,
                name: newproducts.name,
                price: newproducts.price
            })


        res.status(200).send({ newproducts, message: "Produto criado com sucesso  ." })
    } catch (error) {

        res.status(errorCode).send({ message: error.message });
    }
}