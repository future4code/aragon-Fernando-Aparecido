// Exercício 2//
//Crie um função que receba uma string com o nome e outra string com uma data de nascimento (ex.: “24/04/1993”). A função deve separar o dia, o mês e ano e retornar uma string no seguinte formato: 

function dados(nome:string,nascimento:string):string{
    const data =nascimento.split("/")
    return `olá,meu,nome,è,${nome}i nasci nodia  ${data[0]} do mês${data[1]}
    ndo ano  ${data[2]}  `
}
console.log(dados("Fernando","17/08/1993"))