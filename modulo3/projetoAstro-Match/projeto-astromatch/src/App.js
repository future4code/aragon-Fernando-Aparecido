import react, { useState } from "react"
import { unstable_renderSubtreeIntoContainer } from "react-dom"
import Matches from "./components/Matches"
import Perfil from "./components/Perfil"
export default function App() {

  const [paginaAtual, setPaginaAtual] = useState("perfil")
  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina)
  }
  const renderizaPagina = () => {
    switch (paginaAtual) {
      case "perfil":
        return <Perfil />
      case "matches":
        return <Matches />
      default:
        return <section>
          pagina não encontrada
        </section>

    }
  }
  const trocarBotao = () => {
    if (paginaAtual === "perfil") {
      return <button onClick={
        () => mudarPagina("matches")
      }>
        ir para matches
      </button>
    } else {
      return <button onClick={() => mudarPagina("perfil")}>
        ir para  perfil
      </button>
    }
  }
  return (
    <main>
      <header>
        <h1>
          bem-vindo ao Astro-Match.
        </h1>
        {trocarBotao()}

      </header>
      {renderizaPagina()}
    </main >
  )
}
