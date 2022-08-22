import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PURCHASES } from "../database/tableNames";

export const getPorchase = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const result = await connection(TABLE_PURCHASES)
            .select()
        res.status(200).send({ getPorchase: result })

    } catch (error: any) {
        res.status(error).send({ message: error.message })
    }
}