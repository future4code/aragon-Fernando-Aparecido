enum Cores {
    VERMELHO = "vermelho",
    LARANJA = "laranja",
    AMARELO = "amarelo",
    VERDE = "verde",
    AZULCLARO = "azul claro",
    AZUL = "azul",
    ROXO = "roxo"
}
const pessoa: { nome: string, idade: number, corFavorita: string } = { nome: "Fernando", idade: 28, corFavorita: Cores.}
console.log(pessoa)