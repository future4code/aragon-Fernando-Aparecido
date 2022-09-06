import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { goToHomePage } from "../../routes/cordinator"
export default function ErrorPage() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => { goToHomePage(navigate) }, 5000)
    }, [])

    return (

        <>
            <p> <b>Página não encontrada </b> </ p>
            <p>Você será redirecionado para HomePage em 5s!</p>
        </>
    )
}