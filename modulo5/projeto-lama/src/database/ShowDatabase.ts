import { IShowDB, Show } from "../models/Show"
import { BaseDatabase } from "./BaseDatabase"

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public createShow = async (Show: Show) => {
        const showDatabase = this.createShow(Show)

        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .insert(showDatabase)
    }

    public getShows = async () => {
        const showDatabase: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()

        return showDatabase
    }

    public findShowById = async (showId: string): Promise<IShowDB | undefined> => {
        const showDatabase: IShowDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({ id: showId })

        return showDatabase[0]
    }

    public deleteShow = async (showId: string) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_SHOWS)
            .delete()
            .where({ id: showId })
    }
}