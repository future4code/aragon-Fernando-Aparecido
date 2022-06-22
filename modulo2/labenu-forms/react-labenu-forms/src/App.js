import React from 'react';

class App extends React.Component {
  //Abaixo, nosso estado irá comandar o número do componente a ser renderizado na tela. O componente inicial é o número 1.
  state = {
    componente: 1
  };

  renderizaComponente = () => {
   //Insira seu código aqui
  }

  //Abaixo, a função responsável para alterar o número do componente. Ela será chamada no botão da linha 24 e o próximo componente será renderizado.
  proximoComponente= () => {
    this.setState({ etapa: this.state.componente + 1 });
  };

  render() {
    return (
      <div className="App">
        {/* Abaixo, chamamos a função responsável por renderizar o componente */}
        {this.renderizaComponente()}
        {/* Abaixo, ao clicar no botão, alteramos o estado e a função acima será chamada novamente para renderizar o novo componente */}
        <button onClick={this.proximoComponente}>Próximo componente</button>
      </div>
    );
  }
}

export default App;
