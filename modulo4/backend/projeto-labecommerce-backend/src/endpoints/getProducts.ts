import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product";

export const getProduct = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const result = await connection(TABLE_PRODUCTS)
            .select()
        res.status(200).send({ product: result })
    } catch (error: any) {
        res.status(error).send({ message: error.message })
    }
};
