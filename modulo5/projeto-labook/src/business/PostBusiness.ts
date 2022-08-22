import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { ICreatePostInputDTO, IDeletePostInputDTO, IEditPostInputDTO, IGetPostOutputDTO, IGetPostsInputDTO, Post } from "../models/Post"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private postDatabase: PostDatabase
    ) { }

    public getPosts = async (input: IGetPostsInputDTO) => {
        const token = input.token
        const search = input.search || ""
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1
        const offset = limit * (page - 1)
        if (!token) {
            throw new Error("Token faltando")
        }
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token inválido")
        }

        const postsDB = await this.postDatabase.getPosts(
            search,
            sort,
            limit,
            offset
        )
        const posts = postsDB.map((postDB) => {
            return new Post(
                postDB.id,
                postDB.content,
                postDB.user_id
            )
        })
        const response = {
            posts
        }
        return response
    }

    public createPost = async (input: ICreatePostInputDTO) => {
        const content = input.content
        const token = input.token
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }
        if (!content) {
            throw new Error("Parâmetro content faltando")
        }
        if (typeof content !== "string") {
            throw new Error("Parâmetro content deve ser uma string")
        }
        if (content.length < 3) {
            throw new Error("Parâmetro content deve possuir pelo menos 3 caracteres")
        }
        const idGenerator = new IdGenerator()
        const post = new Post(
            idGenerator.generate(),
            content,
            payload.id
        )
        await this.postDatabase.createPost(post)
        const response = {
            message: "Post criado com sucesso",
            post
        }
        return response
    }

    public editPost = async (input: IEditPostInputDTO) => {
        const token = input.token
        const content = input.content
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }
        if (content && typeof content !== "string") {
            throw new Error("Parâmetro content deve ser uma string")
        }
        if (content && content.length < 3) {
            throw new Error("Parâmetro content deve possuir pelo menos 3 caracteres")
        }
        const postDB = await this.postDatabase.findPostById(token)
        if (!postDB) {
            throw new Error("O post a ser editado, não existe")
        }
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.user_id
        )
        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== post.getUserId()) {
                throw new Error("Esse post não pode ser editado por esse usuário")
            }
        }
        content && post.setContent(content)
        await this.postDatabase.updatePost(post)
        const response = {
            message: "Post editado com sucesso",
            post
        }
        return response
    }

    public deletePost = async (input: IDeletePostInputDTO) => {
        const token = input.token
        const idToDelete = input.idToDelete
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Token faltando ou inválido")
        }
        const postDB = await this.postDatabase.findPostById(idToDelete)
        if (!postDB) {
            throw new Error("O post a ser deletado não existe")
        }
        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.user_id)
        if (payload.role === USER_ROLES.NORMAL) {
            if (payload.id !== post.getUserId()) {
                throw new Error("Esse post não pode ser deletado por esse usuário")
            }
        }
        await this.postDatabase.deletePostById(post.getId())
        const response = {
            message: "Post deletado com sucesso"
        }
        return response
    }
}
