import { Request, Response } from "express";
import { users } from "../database/data";
import { TABLE_USERS } from "../database/tableNames";
import { User } from "../models/User";
import connection from "../database/connection";
export const createUser = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Email ou senha incorretos. 'mail', 'password'")
        }

        const newuser: User = {
            id: Date.now().toString(),

            email,
            password,

        }

        await connection(TABLE_USERS)
            .insert({
                id: newuser.id,
                email: newuser.email,
                password: newuser.password
            })


        res.status(200).send({ newuser, message: "Uzuario criado com sucesso  ." })
    } catch (error) {

        res.status(errorCode).send({ message: error.message });
    }
}