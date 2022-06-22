import React from 'react'
import './Post.css'

class Post extends React.Component {
  //Abaixo, temos o estado do nosso componente Post
  state = {
    numeroCurtidas: 0
  }

  //Abaixo, temos a função responsável por alterar o estado que guarda o número de curtidas.
  curtir = () => {
    //Escreva seu código aqui
  }

  render() {
    return <section>
      <div className="post-header">
        <img className="foto-usuario" src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </div>

      <img className="foto-post" src={this.props.fotoPost} alt={'Imagem do post'}/>

      <button onClick={this.curtir}>Curtir</button>
      <button>Descurtir</button>
      Curtidas: {this.state.numeroCurtidas}
    </section>
  }
}

export default Post