import {useNavigate} from "react-router-dom"
function Header() {
  const navigate = useNavigate()
  return <header>
        <h1>Bem-Vindo ao: Labex. </h1>
        <button onClick={()=>navigate("/admin")}>entrar</button>
    </header>
}
export default Header