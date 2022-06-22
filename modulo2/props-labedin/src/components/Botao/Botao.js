
import React from "react";
// 1. Receba as props na linha abaixo
function Botao(props) {
    return (  
        //2. Acesse a prop recebida e substitua o texto do botão pela prop.
        <button>
            {props.texto}
        </button>
    );
}

export default Botao