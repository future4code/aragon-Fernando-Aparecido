import React from 'react';
import './CardPerfil.css'

//Na linha abaixo, note o objeto props sendo recebido dentro dos parênteses do componente.
// As props que estão sendo recebidas chegam com o nome que definimos em nosso App.js (nome, imagen, descricao).
function CardPerfil(props) {
    return (
        <div className="bigcard-container">
            {/* Abaixo, acessamos a prop com notação de ponto igual um objeto no javascript. */}
            <img src={ props.imagem } />
            <div>
                <h4>{ props.nome }</h4>
                <p>Descrição: { props.descricao }</p>
            </div>
        </div>
    )
}

export default CardPerfil;