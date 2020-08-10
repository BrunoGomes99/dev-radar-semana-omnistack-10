import React from 'react';

function Header(props){ // "props" serve para receber os parâmetros passados pela classe PAI
    return(
        <h1>{props.title}</h1> // Para utilizar elementos js dentro de html, usa-se chaves em volta
    );
}

export default Header;


// Código que serve puramente para explicação da ferramenta