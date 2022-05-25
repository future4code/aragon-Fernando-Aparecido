import { useNavigate } from "react-router-dom"


function PaginaAdmin() {
  const navigate = useNavigate()
  const logout =()=>{
      localStorage.removeItem("token-labex")
      navigate("/")
      
  }

   return <section>
<h1>Labe-x</h1>
        <button onClick={logout}>sair</button> 
        <h3>Bem-Vindo Admin.</h3>
    </section>
}
export default PaginaAdmin