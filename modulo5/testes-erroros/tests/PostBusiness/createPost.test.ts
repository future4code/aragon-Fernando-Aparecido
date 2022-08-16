import { PostBusiness } from "../../src/business/PostBusiness"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { ICreatePostInputDTO } from "../../src/models/Post"
import { BaseError } from "../../src/errors/BaseError"

describe("Testando PostBusiness", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("createPost bem sucedido", async () => {
        const input: ICreatePostInputDTO = {
            token: "token-astrodev",
            content: "Oi mundo!"
        }

        const response = await postBusiness.createPost(input)

        expect(response.message).toEqual("Post criado com sucesso")
        expect(response.post.getId()).toEqual("id-mock")
        expect(response.post.getContent()).toEqual("Oi mundo!")
        expect(response.post.getUserId()).toEqual("101")
    })

    test("falha em criar post", async () => {
        expect.assertions(2);
        try {
            await postBusiness.createPost({ token: "token-astrodev", content: "" } as ICreatePostInputDTO)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'content' inválido")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

    test("falha em criar post", async () => {
        expect.assertions(2);
        try {
            await postBusiness.createPost({ token: "token-astrodev", content: "" } as ICreatePostInputDTO)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'content' inválido: mínimo de 1 caracteres")
                expect(error.statusCode).toEqual(400)
            }
        }
    })

})