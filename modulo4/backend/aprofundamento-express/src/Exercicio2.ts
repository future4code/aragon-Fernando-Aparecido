export type Tarefa = {
    id: number,
    idUzuario: string, descricao: string
    estatos: boolean
}
export const tarefas: Tarefa[] = [
    {
        id: 1,
        idUzuario: "u1",
        descricao: "Lavar o carro.",
        estatos: false
    },
    {
        id: 2,
        idUzuario: "u2",
        estatos: true,
        descricao: "Arrumar, meu carro.",
    },
    {
        id: 3,
        idUzuario: "u3",
        estatos: true,
        descricao: "ligar meu carro, para carregar a: Bateria.",
    },
    {
        id: 4,
        idUzuario: "u4",
        estatos: false,
        descricao: "Trocar, de carro.",
    },
    {
        id: 5,
idUzuario: "u5",
estatos:true,
    descricao:"Abastecer, meu carro."
}
]

