import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { goToLoginPage } from "../components/coodinator"
import Header from "../components/Header"


export default function FeedPage (){
    const navigate = useNavigate()
    useEffect(() =>{
        const token=window.localStorage.getItem("token-labeddit")
        if (!token) {
            goToLoginPage(navigate)
        }
    },[
    ])
    return(<>
    <Header />
    <main>
        <h1>FeedPage</h1>
    </main>
    </>)
}