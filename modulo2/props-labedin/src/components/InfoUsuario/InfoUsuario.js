import React from "react";
function InfoUsuario(props){
    return (
        <>
          <h1>informações do usuario</h1>
          <p>endereço{props.endereco}</p>
          <p>e-mail:{props.email}</p>
          <a href={props.link}>link do github</a>
        </>
    )
}
export default InfoUsuario