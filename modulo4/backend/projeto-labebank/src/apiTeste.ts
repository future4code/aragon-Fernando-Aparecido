import axios from 'axios'

// Testando o ping
axios.get("http://localhost:3003/ping").then((res) => {
    console.log(res.data)
})

// Testando a criação de contas
axios.post("http://localhost:3003/contas", {
    nome: "Fulano3",
    cpf: "123456",
    dataNascimento: "01/01/2020"
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err.response.data)
})

// Testando a busca do saldo por id da conta
axios.get("http://localhost:3003/contas/100").then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err.response.data)
})

// Testando a adição de saldo
axios.put("http://localhost:3003/contas/100", {
    saldoAdicional: 5000
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err.response.data)
})

// Testando o pagamento 
axios.put("http://localhost:3003/contas/1/pagamento", {
    descricao: "iFood - Peixe na rede",
    valor: 120
}).then((res) => {
    console.log(res.data)
}).catch((err) => {
    console.log(err.response.data)
})