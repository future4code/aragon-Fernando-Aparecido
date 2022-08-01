import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"
    public createUsers = async (element: User) => {
        const userDB: IUserDB = {
            id: element.getId(),
            nickname: element.getNickname(),
            email: element.getEmail(),
            password: element.getPassword()
        }
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

}