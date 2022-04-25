import React from 'react';
import Post from './components/Post/Post';

//Abaixo, perceba que o componente App é pai do componente Post
class App extends React.Component {
  render() {
    return (
      <main>
        {/* Abaixo, temos o componente Post */}
        <Post
          // Abaixo, note que passamos três propriedades: A foto e o nome do usuário e a foto do post.
          nomeUsuario={'paulinha'}
          fotoUsuario={'https://picsum.photos/50/50'}
          fotoPost={'https://picsum.photos/200/150'}
        />
      </main>
    );
  }
}

export default App;
