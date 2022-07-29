import { IStudentDB } from "../models/Student"
import { BaseDatabase } from "./BaseDatabase"

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENTS = "Labe_Students"
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"

    public async getAllStudents() {
        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
        return result
    }

    public async getStudentByName(name: string) {
        const result = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where("name", "LIKE", `%${name}%`)
        return result
    }
}

    public async createStudent(newStudent: IStudentDB) {
    await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .insert(newStudent)
}

    public async editStudentClassroom(student: string, newClassroomId: string) {
    await BaseDatabase
        .connection(StudentDatabase.TABLE_STUDENTS)
        .update({ classroomId: newClassroomId })
        .where({ id: newClassroomId })
}
}
