type ClienteBanco = {
    cliente: string,
    saldoTotal: number,
    debitos: number[]
}

const clientes: ClienteBanco[] = [
    { cliente: "João", saldoTotal: 1000, debitos: [100, 200, 300] },
    { cliente: "Paula", saldoTotal: 7500, debitos: [200, 1040] },
    { cliente: "Pedro", saldoTotal: 10000, debitos: [5140, 6100, 100, 2000] },
    { cliente: "Luciano", saldoTotal: 100, debitos: [100, 200, 1700] },
    { cliente: "Artur", saldoTotal: 1800, debitos: [200, 300] },
    { cliente: "Soter", saldoTotal: 1200, debitos: [] }
]

function listaClientes(clientes: ClienteBanco[]): ClienteBanco[] {
    const listaAtualizada = clientes.map((item: ClienteBanco) => {
        let saldoAtualizado = 0

        for (let saldoTotal of item.debitos) {
            saldoAtualizado -= saldoTotal
        }

        const clienteComSaldoAtualizado: ClienteBanco = {
            cliente: item.cliente,
            saldoTotal: item.saldoTotal + saldoAtualizado,
            debitos: []
        }

        return clienteComSaldoAtualizado
    })

    const resultado: ClienteBanco[] = listaAtualizada.filter((item: ClienteBanco) => {
        return item.saldoTotal && item.saldoTotal < 0
    })

    return resultado
}

console.log(listaClientes(clientes))
