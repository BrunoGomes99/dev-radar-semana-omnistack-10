import React from 'react';
import ReactDOM from 'react-dom'; // Permite ao react se comunicar com a árvore de elementos em html
import App from './App'; // Importa o código App.js da mesma pasta

// JSX (JavaScript + XML (HTML)). Por usar isso, deve-se importar o React
ReactDOM.render(<App />, document.getElementById('root'));  // Coloca o conteúdo de APP.js dentro da div com Id "root"
 
