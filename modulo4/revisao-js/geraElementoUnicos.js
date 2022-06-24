const primeiraLista = [
    { nome: "Banana" },
    { nome: "Laranja" },
    { nome: "chocolate" },
    { nome: "pipoca" },
    { nome: "maçã-do-amor" }
]

const segundaLista = [
    { nome: "Laranja" },
    { nome: "Cebola" },
    { nome: "brocolis" }
]

const novaLista = (primeiraLista, segundaLista) => {
    const listaDeAlimentos = []
    for (let itemConcat of listaAtualizada) {
        const itemListaDeAlimentos = listaDeAlimentos.find((item) => item.nome === itemConcat.nome)
        if (!itemListaDeAlimentos) {
            listaDeAlimentos.push(itemConcat)
        }
    }
    return listaDeAlimentos
    console.log((listaDeAlimentos))
}
