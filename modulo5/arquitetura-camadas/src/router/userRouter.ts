import { Router } from 'express'
import { UserController } from '../controller/UserController'

export const userRouter = Router()
const userController = new UserController()

userRouter.get("/users", userController.getAllUsers)
userRouter.post("/signUp", userController.signUp)
userRouter.post("/login", userController.login)
userRouter.post("/users:id", userController.deletUser)