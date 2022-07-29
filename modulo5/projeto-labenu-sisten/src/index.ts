import express from "express"
import cors from "cors"
import knex from "knex"
import dotenv from "dotenv"
import { ClassroomController } from "./endpoints/ClassroomController"
import { StudantController } from "./endpoints/StudentController"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const classroomController = new ClassroomController()
const studentController = new StudantController

app.get("/classrooms", classroomController.getAllClassrooms)
app.get("/students", studentController.getAllStudents)
app.get("/students/name", studentController.getStudantByName)
app.post("/classrooms", classroomController.createClassroms)
app.post("/students", studentController.createStudent)
app.put("/classrooms/module", classroomController.editModule)
app.put("/students/classroom", studentController.editStudentClassroom)
