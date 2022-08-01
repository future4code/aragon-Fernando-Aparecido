import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signUp = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { nickName, email, password } = req.body
            if (!nickName || !email || password) {
                throw new Error("Parâmetro ausente.")
            }
            const id = new IdGenerator().generate()
            const user = new User(id, nickName, email, password)
            await new UserDatabase().createUsers(user)
            const payload: ITokenPayload = {
                id: user.getId()
            }
            const token = new Authenticator().generateToken(payload)
            res.status(201).send({ message: "Usuário criado com sucesso.", token })
        } catch (error) {
            if (typeof error.message === "string" && error.message.includes("Duplicate entry")) {
                return res.status(409).send("Usuário ja existe.")
            }
            res.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { email, password } = req.body
            if (!email || password) {

            }
        } catch (error) {

        }
    }
}