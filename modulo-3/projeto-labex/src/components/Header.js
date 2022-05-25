import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Header() {
  const [email, setEmail] = useState("")

  const [senha, setSenha] = useState("")
  const navigate = useNavigate()
  const mudaEmail = (e) => { setEmail(e.target.value) }
  const mudaSenha = (e) => { setSenha(e.target.value) }
  const logar = () => {
    const body = {
      email: email,
      password: senha
    }
    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labeX/fernando-aragon/login", body)
      .then((res) => { 
        localStorage.setItem("token-labex", res.data.token)
       alert("logado com sucesso!")
        navigate("/admin")
      })
      .catch((err) => { alert(err.response.data) })
  }
  return <header>
    <h1>Bem-Vindo ao: Labex. </h1>
    <form>
      <label htmlFor="email">e-mail:</label>
      <input id="email" value={email} onChange={mudaEmail} />
      <br></br>
      <label htmlFor="senha">senha:</label>
      <input id="senha" value={senha} onChange={mudaSenha} />
    </form>
    <button onClick={logar}>entrar</button>
  </header>
}
export default Header