import React from "react";
export default function App() {
  return (
    <div>
      <header>
        <h1>labetube</h1>
        <input type="text" placeholder="busque por"></input>

      </header>

      <main>

        <nav className="menu-vertical">

          <ul>

            <li className="botoes-meunu-vertical">Início</li>

            <li className="botoes-meunu-vertical">Em alta</li>

            <li className="botoes-meunu-vertical">Inscrições</li>

            <hr />

            <li className="botoes-meunu-vertical">Originais</li>

            <li className="botoes-meunu-vertical">Histórico</li>

          </ul>

        </nav>



        <section className="painel-de-videos">

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=1 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=2 " alt="" />

            <h4>{titulo}</h4>

        </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=3 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=4 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=5 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=6 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=7 " alt="" />

            <h4>{titulo}</h4>

          </figure>

          <figure className="box-pagina-principal" onClick={reproduzVideo}>

            <img src="https://picsum.photos/400/400?a=8 " alt="" />

            <h4>{titulo}</h4>

          </figure>

        </section>

      </main>

      <footer>
        <h4>copyright</h4>
      </footer>
    </div>
  )
}