import { UserBusiness } from "../../src/business/UserBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ISignupInputDTO } from "../../src/models/User"
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

    test("signup bem sucedido", async () => {
        const input: ISignupInputDTO = {
            name: "astrodev",
            email: "astrodeve@gmail.com",
            password: "astro1234"
        }

        const response = await userBusiness.signup(input)

        expect(response.message).toEqual("Cadastro realizado com sucesso")
        expect(response.token).toEqual("token-mock")
    })

    test("falha no signup-name vazio", async () => {
        expect.assertions(2);

        try {
            await userBusiness.signup({ name: "", email: "astrodev@gmail.com", password: "astro1234" } as ISignupInputDTO)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Invalid name")
                expect(error.statusCode).toEqual(400)
            }

        }
    })

    test("falha no signup-password vazio", () => {
        expect.assertions(2);

        try {
            await userBusiness.signup({ name: "astrodev", email: "astrodev@gmail.com", password: "" } as ISignupInputDTO)

        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Invalid password")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})
