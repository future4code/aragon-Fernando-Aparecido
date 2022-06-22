import axios from "axios"
import {goToFeedPage} from "../routes/coodinator"
export const requestLogin =(form,navigate,clear) =>{
    const body={email: form.email,password:form.password}
    axios.post(`${BASE_URL}/users/login`,body)
    .then(response =>{
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("userEmail",form.email)
        alert("logado com sucesso ")
goToFeedPage(navigate)
    })
    .catch(error => {
        alert("erro, login não efetuado.")
        clear()
    })
}
export const requestSignup=(form,navigate,clear)=>{}