// console.log(`Hello World!`)

const soccerPlayer:string = "Dibraldinho"
let age:number = 42
let isPlaying:boolean = false

const arrayDeRonaldos:Array<number> = [7,9,10]
const arrayDeRonaldosNomes:Array<string> = ["CR7", "O Mago", "Fenômeno"]
const arr:number[] = [1,2,3]
const array:string[] = ["pipoca", "amendoim"]

const person:{name:string, age:number} = {
  name:"Jabicó",
  age:7
}
const objetoDeFrutas:{name:string, price:number}={
  name:"Abacaxi",
  price:9.00
}

let semControleDeTipagem:any = 7
semControleDeTipagem = false
semControleDeTipagem = "Oi"
semControleDeTipagem = [1,2,3,4,5,6]

//Como era funções no JS
// function soma(n1,n2){
//   return n1 + n2
// }

// function soma(n1:number, n2:number):number {
//   return n1 + n2
// }

//Função sem retorno, significa que você ficou no vácuo => void
// function sayHello(name?:string):void {
//   console.log("Hello", name || "World")
// }

// function method(condition:boolean, callback:() => void):void {
//   if (condition) {
//     callback()
//   }
// }

const marcaDeCarros:string[] = ["Toyota", "Chevrolet", "Honda", "Fiat", "Toyota", "Ford"]

function buscarCarrosPorMarca(frota:string[],marca?:string):string[] {
  if (marca === undefined) return frota
  return frota.filter((carro) => {
    return carro === marca
  })
}
console.log(buscarCarrosPorMarca(marcaDeCarros))
console.log(buscarCarrosPorMarca(marcaDeCarros, "Toyota"))
console.log(buscarCarrosPorMarca(marcaDeCarros, "Honda"))