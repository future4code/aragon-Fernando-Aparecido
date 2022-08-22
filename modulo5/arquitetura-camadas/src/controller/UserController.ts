import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"

export class UserController {

    public signUp = async (req: Request, res: Response) => {
        try {
            const response = await new UserBusiness().signUp({ name: req.body.name, email: req.body.email, password: req.body.password })
            res.status(201).send(response)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const response = await new UserBusiness().login({ email: req.body.email, password: req.body.password })
            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const response = await new UserBusiness().getAllUsers({ token: req.headers.authorization })
            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public deletUser = async (req: Request, res: Response) => {
        try {
            const response = await new UserBusiness().deletUser({ token: req.headers.authorization, id: req.params.id })
            res.status(201).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}
