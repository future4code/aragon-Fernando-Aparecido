import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ILoginInputDTO } from "../../src/models/User"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testando UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("login bem sucedido", async () => {
        const input: ILoginInputDTO = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)

        expect(response.message).toEqual("Login realizado com sucesso")
        expect(response.token).toEqual("token-astrodev")
    })



    test("falha no login-email incorreto.", async () => {
        expect.assertions(2);
        try {
            await userBusiness.login({
                email: "astrodev@gmail.com.br", password: "astro1234"
            } as ILoginInputDTO)
        }
        catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("parametro faltando")
                expect(error.statusCode).toEqual(400)
            }
        }
    })


})