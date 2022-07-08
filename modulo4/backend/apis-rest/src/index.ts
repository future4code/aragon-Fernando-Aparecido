import express, { Request, Response } from 'express'
import cors from 'cors'
import { User, users, USER_ROLE } from "./data"
import { ExitStatus } from 'typescript'
const app = express()

app.use(cors())
app.use(express.json())
app.listen(3003, () => console.log("servidor rodando na porta 3003."))

app.get("/users", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const { role } = req.query
        if (role && !(role.toString() in USER_ROLE)) {
            errorCode = 422
            throw new Error("Invalid type.")
        }
        const result = users.filter(element => {
            if (role) return role.toString() === element.role
            else {
                return element
            }
        })
        res.status(200).send({
            users: result
        })
    } catch (error: any) {
        if (res.statusCode === 200) { res.status(500).end() }
        else res.status(errorCode).send(error.message)
    }
})



app.post("/users", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
        const { id, name, email, age, role } = req.body
        if (!id || !name || !email || !age || !role) {
            errorCode = 422
            throw new Error("id, name,email,age or role is required")
        }
        if (typeof id !== "number" || typeof name !== "string" || typeof email !== "string" || typeof age !== "number") {
            errorCode = 422
            throw new Error("id must be a number, name and email must be a string, age must be a number or role must be ADMIN or NORMAL")
        }
        const checkEmail: any = users.findIndex(user => user.email === email)
        if (checkEmail < 0) {
            const newUsers: User = {
                id: Date.now(),
                name: name,
                email: email,
                age: age,
                role: role
            }
            users.push(newUsers)
            res.status(201).send({
                message: "User created successfully!",
                users: users
            })
        } else {
            errorCode = 409
            throw new Error("Email already exists");
        }
    } catch (error: any) {
        res.send({ message: error.message })
    }
})


app.put("https://localhost:3003/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email } = req.body
        if (typeof id !== "number" || typeof email !== "string") {
            res.statusCode = 422
            throw new Error("error: id diferente de number.")
        }
        if (id <= 0) {
            res.statusCode = 422
            throw new Error("error: id tem que ser maior ou igual a 0.")
        }
        const index = users.findIndex((user) => {
            return id === id
        })
        if (index === -1) {
            res.statusCode = 422
            throw new Error("error: id não encontrado")
        }
        const newemail = users.map((user) => {
            if (user.id === id) {
                user.id = id
            }
            return email
        }
        ).filter((email) => {
            return email === email
        })
        res.status(201).send({
            message: "Email alterado",
            email: newemail
        })
    } catch (error: any) {
        res.send({ message: error.message })
    }
})


app.delete("https://localhost:3003/users/:id", (req: Request, res: Response) => {
    try {
        const id = (users.length - 1).toString()
        const index = users.findIndex((user) => {
            return id === id
        })
        if (index === -1) {
            return res.send({
                mensagem: "Usuario não encontrado",
                id: id
            })
        }
        users.splice(index, 1)
        res.send({
            mensagem: "Usuario deletado com sucesso",
            users: users
        })
    }
    catch (error: any) {
        res.status(500).send(error.message)
    }
})
