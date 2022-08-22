export class User {
    constructor(private id: string, private email: string, private password: string) {
        this.id = id
        this.email = email
        this.password = password
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getPassword() {
        return this.password
    }
    setId(newId: string) {
        this.id = newId
    }
    setEmail(newEmail: string) {
        this.email = newEmail
    }
    setPassword(newPassword: string) {
        this.password = newPassword
    }
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

