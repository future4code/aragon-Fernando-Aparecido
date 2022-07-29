import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { StudentDatabase } from "../database/StudentDatabase";
import { IStudentDB } from "../models/Student";

export class StudantController {
    public async getAllStudents(req: Request, res: Response) {
        let errorCode = 400
        try {
            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getAllStudents()
            res.status(200).send({ studants: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async getStudantByName(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.query.name as string
            const studentDatabase = new StudentDatabase()
            const result = await studentDatabase.getStudentByName(name)
            res.status(200).send({ students: result })
        } catch (error) {
            res.status(errorCode).send({ message: error.message });
        }
    }

    public async createStudent(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const email = req.body.email
            const birthdate = req.body.birthdate
            const classroomId = req.body.classroomId
            const newStudent: IStudentDB = {
                id: Date.now().toString(),
                name: name,
                email: email,
                birthdate: new Date(birthdate),
                classroom_id: classroomId
            }
            const studentDatabase = new StudentDatabase()

            await studentDatabase.editStudent(newStudent)
            res.status(200).send({ message: "Estudante auterado com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public async editClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const studentId = req.body.studentId
            const newClassroomId = req.body.newClassroomId
            const studentDatabase = new StudentDatabase()

            await studentDatabase.editStudentClassroom(studentId, newClassroomId)
            res.status(200).send({ message: "Turma auterada com sucesso." })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}