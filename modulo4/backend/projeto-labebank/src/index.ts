import express, { Request, Response } from 'express'
import cors from 'cors'

type Pagamento = {
    // Apague esse comentário e faça as propriedades do type aqui
}

type Conta = {
    // Apague esse comentário e faça as propriedades do type aqui
    extrato: Pagamento
}

// Mock simulando um array de contas no Banco de Dados
let contas: Conta[] = [
    {
        id: 1,
        nome: "Alice",
        cpf: "86043454009",
        dataNascimento: "12/01/1999",
        saldo: 12599,
        extrato: [
            {
                descricao: "conta de água",
                valorPago: 599,
                dataPagamento: "05/07/2022"
            }
        ]
    },
    {
        id: 2,
        nome: "Bob",
        cpf: "96610431086",
        dataNascimento: "25/06/1997",
        saldo: 5000,
        extrato: [
            {
                descricao: "conta de luz",
                valorPago: 249.27,
                dataPagamento: "15/06/2022"
            }
        ]
    }
]

const app = express()
app.use(express.json())
app.use(cors())

// Para testar se o servidor está tratando os endpoints corretamente
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong!")
})

app.listen(3003, () => {
  console.log('Server is running at port 3003')
})