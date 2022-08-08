import { UserDatabase } from "../database/UserDatabase"
import { User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    public signUp = async (input: any) => {
        const { name, email, password } = input

        if (!name || !email || !password) {
            throw new Error("Parâmetros faltando")
        }
        if (typeof name !== "string") {
            throw new Error("Parâmetro name deve ser uma string")
        }
        if (typeof email !== "string") {
            throw new Error("Parâmetro email deve ser uma string")
        }
        if (typeof password !== "string") {
            throw new Error("Parâmetro password deve ser uma string")
        }
        if (name.length < 3) {
            throw new Error("O parâmetro name deve possuir ao menos 3 caracteres")
        }
        if (password.length < 6) {
            throw new Error("O parâmetro password deve possuir ao menos 6 caracteres")
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
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )
        const userDatabase = new UserDatabase()
        const isUserExists = await userDatabase.findByEmail(email)
        if (isUserExists) {
            throw new Error("usuário já existe")
        }

        await userDatabase.createUser(user)
        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }
        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)
        const response = { message: "Cadastro realizado com sucesso.", token }
        return response
    }

    public login = async (input: any) => {
        const { email, password } = input
        if (!email || !password) {
            throw new Error("Email ou senha faltando")
        }
        if (typeof email !== "string") {
            throw new Error("Parâmetro email deve ser uma string")
        }
        if (typeof password !== "string") {
            throw new Error("Parâmetro password deve ser uma string")
        }
        if (password.length < 6) {
            throw new Error("O parâmetro password deve possuir ao menos 6 caracteres")
        }
        if (!email.includes("@") || !email.includes(".com")) {
            throw new Error("O parâmetro password deve possuir ao menos 6 caracteres")
        }
        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findByEmail(email)
        if (!userDB) {
            throw new Error("Email não cadastrado")
        }
        const user = new User(
            userDB.id,
            userDB.name,
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
            throw new Error("Senha inválida")
        }
        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }
        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)
        const response = { message: "Login realizado com sucesso", token }
        return response
    }

    public getAllUsers = async (input: any) => {
        const token = input.headers.authorization
        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido.")
        }
        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.getAllUsers()
        const response = usersDB.map((user) => {
            return new User(user.id, user.name, user.email, user.password, user.role)
        })
        return response
    }

    public deletUser = async (input: any) => {
        const token = input.headers.authorization
        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)
        const userDatabase = new UserDatabase()
        const { id } = input
        const findById = await userDatabase.findById(id)
        if (!payload) {
            throw new Error("Token faltando.")
        }
        if (!findById) {
            throw new Error("Usuário não existe.")
        }
        if (payload.role === "NORMAL") {
            throw new Error("Usuário normal não tem permissão para excluir.")
        }
        if (payload.id === id) {
            throw new Error("O usuário admin não pode se deletar somente deletar os outros usuários.")
        }
        await userDatabase.deletUser(id)
        return { message: "Usuário deletado com sucesso." }
    }
}