import React, { useState, useEffect } from "react"
import axios from "axios"

export default function Matches() {
    const [matches, setMatches] = useState({})
    const buscaMatches = () => {
        axios.get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/fernaod-aragon/person")
            .then((res) => {
                setMatches(res.data.matches)
            })
            .catch((err) => {
                console.log("Erro ao buscar matches")
            })
    }

    useEffect(() => {
        buscaMatches()
    }, [])


    return (

        <header>

            <section>
                <h1>
                    Página de Matches
                </h1>
            </section>
            <section>
                <p>{matches.name}</p>
                <p>{matches.age}</p>
                <img src={matches.photo} alt={matches.photo_alt} width="200px" />
                <p>{matches.bio}</p>
            </section>

        </header>

    )
}
