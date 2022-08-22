import { Request, Response } from "express";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { Recipe } from "../models/Recipe";
import { USER_ROLES } from "../models/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeController {
    public getAllRecipes = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization

            if (!token) {
                errorCode = 401
                throw new Error("Token faltando")
            }

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }

            const recipeDatabase = new RecipeDatabase()
            const recipesDB = await recipeDatabase.getAllRecipes()

            const recipes = recipesDB.map((recipeDB) => {
                return new Recipe(
                    recipeDB.id,
                    recipeDB.title,
                    recipeDB.description,
                    recipeDB.created_at,
                    recipeDB.updated_at,
                    recipeDB.creator_id
                )
            })

            res.status(200).send({ recipes })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public createRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { title, description } = req.body
            if (!token) {
                errorCode = 401
                throw new Error("Token ausente")
            }
            const payload = new Authenticator().getTokenPayload(token)
            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido")
            }
            if (!title || !description) {
                errorCode = 422
                throw new Error("parametro faltando")
            }
            if (title !== "string" || description !== "string") {
                errorCode = 415
                throw new Error("tipo de dado incorreto")
            }
            if (title.length < 3) {
                errorCode = 422
                throw new Error("Título deve possuir 3 ou mais caracteres.")
            }
            if (!description) {
                errorCode = 422
                throw new Error("A descrição deve possuir 10 ou mais caracteres.")
            }
            const id = new IdGenerator().generate()
            const newRecipe = new Recipe(id, title, description, new Date(), new Date(), payload.id)
            await new RecipeDatabase().createRecipe(newRecipe)
            res.status(201).send({ message: "Receita criada com sucesso", newRecipe })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public editRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { id } = req.params
            const { title, description } = req.body
            if (!token) {
                errorCode = 422
                throw new Error("Token ausente.")
            }
            const payload = new Authenticator().getTokenPayload(token)
            if (!payload) {
                errorCode = 401
                throw new Error("Token inválido.")
            }
            if (!title && !description) {
                errorCode = 422
                throw new Error("Não existe título e descrição.")
            }

            if (title && typeof title !== "string") {
                errorCode = 422
                throw new Error("O título deve ser uma string.")
            }

            if (description && typeof description !== "string") {
                errorCode = 422
                throw new Error("A descrição deve ser uma string.")
            }

            if (title && title.length < 3) {
                throw new Error("Título deve ter ao menos 3 caracteres.")
            }

            if (description && description.length < 10) {
                throw new Error("Descrição deve que ter 10 ou mais caracteres.")
            }
            const recipe = await new RecipeDatabase().findById(id)
            if (!recipe) {
                errorCode = 404
                throw new Error("Não foi possível encontrar a id informada.")
            }

            if (payload.role === USER_ROLES.NORMAL) {
                if (payload.id !== recipe.creator_id) {
                    errorCode = 403
                    throw new Error("Somente adimin pode editar as outras receitas além das suas.")
                }
            }
            const newRecipe = new Recipe(recipe.id, recipe.title, recipe.description, recipe.created_at, (recipe.updated_at = new Date()), recipe.creator_id)
            title && newRecipe.setTitle(title)
            description && newRecipe.setDescription(description)
            await new RecipeDatabase().editRecipe(newRecipe)
            res.status(201).send({ message: "Receita editada com sucesso.", newRecipe })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deletRecipe = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)
            const recipeDatabase = new RecipeDatabase()
            const { id } = req.params
            const recipeId = await recipeDatabase.findById(id)
            if (!payload) {
                errorCode = 401
                throw new Error("Token faltando.")
            }
            if (!recipeId) {
                errorCode = 401
                throw new Error("Receita não existe.")
            }
            if (payload.role === "NORMAL") {
                if (recipeId.creator_id === payload.id) {
                    await recipeDatabase.deletRecipe(payload.id)
                }
                errorCode = 401
                throw new Error("usuário normal não pode deletar outras receitas a não ser as suas.")
            }
            if (payload.role === "ADMIN") {
                await recipeDatabase.deletRecipe(id)
            }
            res.status(200).send({ message: "Usuário deletado com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

}