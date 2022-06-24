import React, { useState, useEffect } from "react"
import axios from "axios"

export default function Perfil() {
    const [perfil, setPerfil] = useState({})

    const buscaPerfil = () => {
        axios.get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/pamela-aragon/person")
            .then((res) => {
                setPerfil(res.data.profile)
            })
            .catch((err) => {
                console.log("Erro ao buscar perfil")
            })
    }

    useEffect(() => {
        buscaPerfil()
    }, [])

    const curtir = () => {
        const body = {
            id: perfil.id,
            choice: true
        }

        axios.post("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/pamela-aragon/choose-person", body)
            .then((res) => {
                alert("curtil")
                buscaPerfil()
            })
            .catch((err) => {
                console.log("erro ao curtir")
            })
    }

    const descurtir = () => {
        const body = {
            id: perfil.id,
            choice: false
        }

        axios.post("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/pamela-aragon/choose-person", body)
            .then((res) => {
                alert("descurtil")
                buscaPerfil()
            })
            .catch((err) => {
                console.log("erro ao descurtir")
            })
    }

    return (

        <header>

            <section>
                <h1>
                    pagina de perfil
                </h1>
            </section>

            <section>
                <p>{perfil.name}</p>
                <p>{perfil.age}</p>
                <img src={perfil.photo} alt={perfil.photo_alt} width="200px" />
                <p>{perfil.bio}</p>
            </section>
            <button onClick={() => curtir()}>curtir</button>

        </header>

    )
}
