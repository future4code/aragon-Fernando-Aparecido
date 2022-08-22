import { Request, Response } from "express";
import { stringify } from "querystring";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { IClassroomDB } from "../models/Classroom";
            
export class ClassroomController {
    public async getAllClassrooms(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const result = await classroomDatabase.getAllClassrooms()

            res.status(200).send({ classrooms: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async createClassroms(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const module = req.body.module
            const newClassroom: IClassroomDB = {
                id: Date.now().toString(),
                name: name,
                module: module
            }
            const classroomDatabase = new ClassroomDatabase()

            await classroomDatabase.createClassroom(newClassroom)
            res.status(200).send({ message: "Turma criada com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async editModule(req: Request, res: Response) {
        let errorCode = 400
        try {
            const newModule = req.body.newModule
            const classroomId = req.body.classroomId
            const classroomDatabase = new ClassroomDatabase()

            await classroomDatabase.editModule(newModule, classroomId)
            res.status(200).send({ message: "Turma auterada com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}
