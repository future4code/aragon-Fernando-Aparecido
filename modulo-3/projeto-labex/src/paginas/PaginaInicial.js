import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../components/Header"

function PaginaInicial(){
const [viagens, setViagens] = useState([])
  
useEffect(() =>{
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labeX/fernando-aragon/trips")
    .then((res)=>{setViagens(res.data.trips)})
    .catch((err) => { alert(err.response.data) })
}, [])
return <section>
        <Header />
        <h1> PaginaInicial. </h1>
        {
            viagens.map((viagem)=>{
                return <article>
                    <h3>{viagem.name}</h3>
                    <p>{viagem.description}</p>
                </article>
            })
        }
    </section>
}
export default PaginaInicial