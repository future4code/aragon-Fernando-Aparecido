const convertTemperatura = (temperaturaEmCelsius, unidadeDeConvercao) => {
    let unidade = unidadeDeConvercao.toUpperCase()
    let convercaoTemperatura = unidade === "K"
        ? (temperaturaEmCelsius + 273.15)
        : ((temperaturaEmCelsius * 9 / 5) + 32)
    if (unidade === "K" && typeof temperaturaEmCelsius === "number") {
        return `${temperaturaEmCelsius}° é equivalente a ${convercaoTemperatura}K`
    }
    else if (unidade === "F" && typeof temperaturaEmCelsius === "number") {
        return `${temperaturaEmCelsius}° é equivalente a ${convercaoTemperatura}°F`
    } else return `Erro! Parâmetro inválido. A função deve receber um número e uma string "K" ou "F" para conversão.`
}

console.log(convercaoTemperatura(20, "K"))
console.log(convercaoTemperatura(20, "F"))
console.log(convercaoTemperatura(200, "k"))
console.log(convercaoTemperatura(20, "r"))
console.log(convercaoTemperatura("dez", "F"))
const convercaoTemperatura = (temperaturaEmCelsius, unidadeDeConvercao) => {
    let unidade = unidadeDeConvercao.toUpperCase()
    let convercaoTemperatura = unidade === "K"
        ? (temperaturaEmCelsius + 273.15)
        : ((temperaturaEmCelsius * 9 / 5) + 32)
    if (unidade === "K" && typeof temperaturaEmCelsius === "number") {
        return `${temperaturaEmCelsius}° é equivalente a ${convercaoTemperatura}K`
    }
    else if (unidade === "F" && typeof temperaturaEmCelsius === "number") {
        return `${temperaturaEmCelsius}° é equivalente a ${convercaoTemperatura}°F`
    } else return `Erro! Parâmetro inválido. A função deve receber um número e uma string "K" ou "F" para conversão.`
}
console.log(convercaoTemperatura(20, "K"))
console.log(convercaoTemperatura(20, "F"))
console.log(convercaoTemperatura(200, "k"))
console.log(convercaoTemperatura(20, "r"))
console.log(convercaoTemperatura("dez", "F"))


// const converteCelsius = (temperaturaAtual, unidade) => {
//     if (temperaturaAtual == unidade) {
//         unidade(F = fahrenheit)
//         const fahrenheit = (0 * 9 / 5) + 32;
//         console.log("o valor de 0 graus em fahrenheit é ", fahrenheit)
//     }
//     else {
//         const converteCelsius = (temperaturaAtual, unidade) => {
//             unidade(K = kelvin)
//             const kelvin = 0 + 273.15;
//             console.log("o valor de 0 graus celsius é ", kelvin, " graus em kelvin")
//         }
//     }
