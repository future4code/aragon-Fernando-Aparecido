import { Request, Response } from "express";
import { users } from "../database/migrations/data";
import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const nickname = req.body.nickname
            const email = req.body.email
            const password = req.body.password
            if (!nickname || !email || !password) {
                throw new Error("Parâmetros faltando")
            }
            if (typeof nickname !== "string") {
                throw new Error("Parâmetro 'nickname' deve ser uma string")
            }
            if (typeof email !== "string") {
                throw new Error("Parâmetro 'email' deve ser uma string")
            }
            if (typeof password !== "string") {
                throw new Error("Parâmetro 'password' deve ser uma string")
            }
            if (nickname.length < 3) {
                throw new Error("O parâmetro 'nickname' deve possuir ao menos 3 caracteres")
            }
            if (password.length < 6) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }
            if (!email.includes("@") || !email.includes(".com")) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }
            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()
            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(password)
            const user = new User(
                id,
                nickname,
                email,
                hashPassword,
                USER_ROLES.NORMAL
            )
            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)
            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }
            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)
            res.status(201).send({
                message: "Cadastro realizado com sucesso",
                token
            })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const email = req.body.email
            const password = req.body.password
            if (!email || !password) {
                errorCode = 401
                throw new Error("Email ou senha faltando")
            }
            if (typeof email !== "string") {
                throw new Error("Parâmetro 'email' deve ser uma string")
            }
            if (typeof password !== "string") {
                throw new Error("Parâmetro 'password' deve ser uma string")
            }
            if (password.length < 6) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }
            if (!email.includes("@") || !email.includes(".com")) {
                throw new Error("O parâmetro 'password' deve possuir ao menos 6 caracteres")
            }
            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)
            if (!userDB) {
                errorCode = 401
                throw new Error("Email não cadastrado")
            }
            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.role
            )
            const hashManager = new HashManager()
            const isPasswordCorrect = await hashManager.compare(
                password,
                user.getPassword()
            )
            if (!isPasswordCorrect) {
                errorCode = 401
                throw new Error("Senha inválida")
            }
            const payload: ITokenPayload = {
                id: user.getId(),
                role: user.getRole()
            }
            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)
            res.status(200).send({
                message: "Login realizado com sucesso",
                token
            })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }


    public getAllUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)
            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando ou inválido.")
            }
            const userDatabase = new UserDatabase()
            const usersDB = await userDatabase.getAllUsers()
            const users = usersDB.map((user) => {
                return new User(user.id, user.nickname, user.email, user.password, user.role)
            })
            res.status(200).send({ users })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deletUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)
            const userDatabase = new UserDatabase()
            const { id } = req.params
            const findById = await userDatabase.findById(id)
            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando.")
            }
            if (!findById) {
                errorCode = 401
                throw new Error("Usuário não existe.")
            }
            if (payload.role === "NORMAL") {
                errorCode = 401
                throw new Error("Usuário normal não tem permissão para excluir.")
            }
            if (payload.id === id) {
                errorCode = 401
                throw new Error("O usuário admin não pode se deletar somente deletar os outros usuários.")
            }
            await userDatabase.deletUser(id)
            res.status(200).send({ message: "Usuário deletado com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

}