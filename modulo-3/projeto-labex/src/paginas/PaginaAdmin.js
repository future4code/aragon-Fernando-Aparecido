import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function PaginaAdmin() {
    const [viagens, setViagens] = useState([])
    const [nome, setNome] = useState("")
    const [planeta, setPlaneta] = useState("")
    const [data, setData] = useState("")
    const [descricao, setDescricao] = useState("")
    const [duracao, setDuracao] = useState("")
    const navigate = useNavigate()
    function mudaNome(e) {
        setNome(e.target.value)
    }
    function mudaPlaneta(e) {
        setPlaneta(e.target.value)
    }
    function mudaData(e) {
        setData(e.target.value)
    }
    function mudaDescricao(e) {
        setDescricao(e.target.value)
    }
    function mudaDuracao(e) {
        setDuracao(e.target.value)
    }
    const logout = () => {
        localStorage.removeItem("token-labex")
        navigate("/")

    }
    useEffect(() => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labeX/fernando-aragon/trips")
            .then((res) => { setViagens(res.data.trips) })
            .catch((err) => { alert(err.response.data) })
    }, [])

    return <section>
        <h1>Labe-x</h1>
        <button onClick={logout}>sair</button>
        <h3>Bem-Vindo Admin.</h3>
        <form>
            <label htmlFor="nome">nome:</label>
            <input id="nome" value={nome} onChange={mudaNome} />
            <br></br>
            <label htmlFor="descricao">descricao:</label>
            <input id="descricao" value={descricao} onChange={mudaDescricao} />
    <br></br>
            <label htmlFor="data">data:</label>
            <input id="data" type="date" value={data} onChange={mudaData} />
            <br></br>
            <label htmlFor="duracao">duracao:</label>
            <input id="duracao" value={duracao} onChange={mudaDuracao} type="number" />
            <br />
            <label htmlFor="planeta">planeta:</label>
            <select>
                <option value="">planeta desejado</option>
                <option value="1">Mercúrio</option>        </select>

        </form>
        {
            viagens.map((viagem) => {
                return <article>
                    <h3>{viagem.name}</h3>
                    <p>{viagem.description}</p>
                </article>
            })
        }

    </section>
}
export default PaginaAdmin