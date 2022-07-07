const funcoesListaDeTarefas=() => {
    return [process.argv[2], process.argv[3], process.argv[4]]
}
console.log("Lista de Tarefas: ", funcoesListaDeTarefas())