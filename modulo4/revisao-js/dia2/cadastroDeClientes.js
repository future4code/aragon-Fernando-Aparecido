const clientes = [
    { id: 1, nome: 'Fulano' },
    { id: 2, nome: 'Ciclano' },
    { id: 3, nome: 'Beltrano' },
    { id: 4, nome: 'Fulana' },
]
function addCliente(cliente) {
    let index = clientes.findIndex(valor => valor.id === cliente.id)
    if (index < 0) {
        clientes.push(cliente)
    } else {
        return console.log(`Erro. Parâmetro inválido: id ${cliente.id} já existe.`)
    }
}
addCliente({ id: 5, nome: "Quele" },)
addCliente({ id: 6, nome: "Pamela" },)
addCliente({ id: 7, nome: "Fernando" },)
addCliente({ id: 7, nome: "Fernando" },)
console.log(clientes)
