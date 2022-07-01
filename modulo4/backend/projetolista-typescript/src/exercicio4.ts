type Cliente = {
    name: string,
    email: string,
    role: string
}

const listaDeClientes: Cliente[] = [
    { name: "Rogério", email: "roger@email.com", role: "user" },
    { name: "Ademir", email: "ademir@email.com", role: "admin" },
    { name: "Aline", email: "aline@email.com", role: "user" },
    { name: "Jéssica", email: "jessica@email.com", role: "user" },
    { name: "Adilson", email: "adilson@email.com", role: "user" },
    { name: "Carina", email: "carina@email.com", role: "admin" }
]
function geraListaEmailAdmin(listaDeClientes: Cliente[]): string[] {
    const clienteAdmim = listaDeClientes.filter((Cliente) => {
        return Cliente.role === "admin"
    })
    return clienteAdmim.map((cliente) => {
        return cliente.email
    })
}
console.log(geraListaEmailAdmin(listaDeClientes))