import { Express, Request, Response } from "express";
import connection from "../database/connection";
import { users } from "../database/data";
import { TABLE_USERS } from "../database/tableNames";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const result = await connection(TABLE_USERS)
            .select()
        res.status(200).send({ users: result })

    } catch (error: any) {
        res.status(error).send({ message: error.message })
    }
}