export interface IStudentDB {
    id: string,
    name: string,
    email: string,
    birthdate: Date,
    classroom_id: string | null
}

export interface IHobbiesDB {
    id: string,
    title: string
}

export interface IStudentsHobbiesDB {
    student_id: string,
    hobby_id: string
}

export class Student {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birthDate: Date,
        private classroonId: string | null,
        private hobbies: string[]
    ) {}

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getEmail() {
        return this.email
    }

    public getBirthDate() {
        return this.birthDate
    }

    public getClassroonId() {
        return this.classroonId
    }

    public getHobbies() {
        return this.hobbies
    }

    public setId(newId: string) {
        this.id = newId
    }
    public setName(newName: string) {
        this.name = newName
    }

    public setEmail(newEmail: string) {
        this.email = newEmail
    }

    public setBirthDate(newBirthDate: Date) {
        this.birthDate = newBirthDate
    }

    public setClassroonId(newClassroonId: string | null) {
        this.classroonId = newClassroonId
    }

    public setHobbies(newHobbies: string[]) {
        this.hobbies = [...newHobbies]
    }
}