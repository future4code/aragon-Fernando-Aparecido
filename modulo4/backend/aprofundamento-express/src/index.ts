import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3003, () =>{
console.log("Servidor rodando na Porta 3003.")
} )

app.get("/pimg",(req: Request, res:Response)=>{
res.send({mensagem : "Pomgue!"})
} )

app.get("/tarefa/:Uzuario", (req: Request, res: Response) => {
    const idUzuario = req.params.idUzuario
    const resultado = tarefa.filter((tarefa) => {
return tarefa.userId === userId
    })
    res.send({
        tarefas:resultado
    })
})
