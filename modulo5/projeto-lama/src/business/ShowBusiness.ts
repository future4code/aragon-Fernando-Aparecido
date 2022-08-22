import { TokenExpiredError } from "jsonwebtoken"
import { ShowDatabase } from "../database/ShowDatabase"
import { ConflictError } from "../errors/ConflictError"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { RequestError } from "../errors/RequestError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { UnprocessableError } from "../errors/UnprocessableError"
import { IBuyTicketInputDTO, IBuyTicketOutputDTO, ICreateShowInputDTO, ICreateShowOutputDTO, IDeleteInputDTO, IDeleteShowOutputDTO, IDeleteTicketInputDTO, IDeleteTicketOutputDTO, IGetShowInputDTO, IGetShowOutputDTO, IShowDB, ITicketDB, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public createShow = async (input: ICreateShowInputDTO) => {
        const { token, band, startsAt } = input

        if (!token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError("Somente admins podem criar shows")
        }

        if (typeof band !== "string") {
            throw new RequestError("Parâmetro 'band' inválido: deve ser uma string")
        }

        if (typeof startsAt !== "string") {
            throw new RequestError("Parâmetro 'startsAt' inválido: deve ser uma string")
        }

        if (band.length < 1) {
            throw new RequestError("Parâmetro 'band' inválido: mínimo de 1 caracter")
        }

        const startsAtDate = new Date(startsAt)

        if (!startsAtDate.getDate()) {
            throw new RequestError("Parâmetro 'startsAt' inválido: deve ser aaaa/mm/dd")
        }

        const festivalStartDate = new Date("2022/12/05")

        if (startsAtDate < festivalStartDate) {
            throw new UnprocessableError("A data do show não pode ser anterior a 2022/12/05")
        }

        const showAlreadyExists = await this.showDatabase.findShowByDate(startsAtDate)

        if (showAlreadyExists) {
            throw new ConflictError("Esse dia já possui show")
        }

        const show = new Show(
            this.idGenerator.generate(),
            band,
            startsAtDate,
            5000
        )

        await this.showDatabase.createShow(show)
        const response: ICreateShowOutputDTO = { message: "Show criado com sucesso.", show }
        return response
    }

    public getShows = async (): Promise<IGetShowOutputDTO> => {
        const showsDB: IShowDB[] = await this.showDatabase.getShow()
        const shows = showsDB.map(showDB => {
            return new Show(
                showDB.id,
                showDB.band,
                showDB.starts_at
            )
        })
        for (let show of shows) {
            const tickets = await this.showDatabase.getTicketsByShowId(show.getId())
            show.setTickets(5000 - tickets)
        }
        const response: IGetShowOutputDTO = {
            shows
        }
        return response
    }

    public buyTicket = async (input: IBuyTicketInputDTO): Promise<IBuyTicketOutputDTO> => {
        const { token, showId } = input
        if (!token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }

        const showDB = await this.showDatabase.findShowById(showId)
        if (!showDB) {
            throw new NotFoundError("Show não encontrado")
        }
        const tickets = await this.showDatabase.getTicketsByShowId(showId)
        const show = new Show(
            showDB.id,
            showDB.band,
            showDB.starts_at,
            5000 - tickets
        )
        if (show.getTickets() === 0) {
            throw new ConflictError("Ingressos esgotados")
        }
        const payload = this.authenticator.getTokenPayload(token)
        const userId = payload.id
        const isTicketAlreadyExists = await this.showDatabase.findTicket(showId, userId)
        if (isTicketAlreadyExists) {
            throw new ConflictError("Você já comprou um ingresso para esse show")
        }
        const ticketDB: ITicketDB = {
            id: this.idGenerator.generate(),
            show_id: showId,
            user_id: userId
        }
        await this.showDatabase.createTicket(ticketDB)
        const response: IBuyTicketOutputDTO = {
            message: "Ingresso reservado com sucesso",
            showDate: show.getStartsAt(),
            band: show.getBand()
        }
        return response
    }

    public deleteTicket = async (input: IDeleteTicketInputDTO): Promise<IDeleteTicketOutputDTO> => {
        const { token, showId } = input
        if (!token) {
            throw new UnauthorizedError("Token inválido ou faltando")
        }
        const showDB = await this.showDatabase.findShowById(showId)
        if (!showDB) {
            throw new NotFoundError("Show não encontrado")
        }
        const payload = this.authenticator.getTokenPayload(token)
        const userId = payload.id
        const ticketDB = await this.showDatabase.findTicket(showId, userId)
        if (!ticketDB) {
            throw new NotFoundError("Você ainda não comprou um ingresso para esse show")
        }
        await this.showDatabase.deleteTicketById(ticketDB.id)
        const response: IDeleteTicketOutputDTO = {
            message: "Ingresso cancelado com sucesso"
        }
        return response
    }

    public deleteShow = async (input: IDeleteInputDTO) => {
        const { token, id } = input
        const payload = this.authenticator.getTokenPayload(token)
        if (!payload) {
            throw new Error("Não autenticado")
        }
        const showDB = await this.showDatabase.findShowById(id)
        if (!showDB) {
            throw new Error("Show não encontrado")
        }
        if (payload.role === USER_ROLES.NORMAL) {
            if (showDB.id !== payload.id) {
                throw new Error("Sem autorização")
            }
        }
        await this.showDatabase.deleteShowById(id)
        const response: IDeleteShowOutputDTO = {
            message: "Show deletado com sucesso"
        }

        return response
    }
}
