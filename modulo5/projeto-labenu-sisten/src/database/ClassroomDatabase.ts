import { IClassroomDB } from "../models/Classroom"
import { BaseDatabase } from "./BaseDatabase"

export class ClassroomDatabase extends BaseDatabase {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"
    public async getAllClassrooms() {
        const result = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
        return result
    }

    public async createClassroom(newClassroom: IClassroomDB) {
        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .insert(newClassroom)
    }

    public async editModule(newModule: string, classroomId: string) {
        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .update({module: newModule})
            .where({id: classroomId})
    }    
}
