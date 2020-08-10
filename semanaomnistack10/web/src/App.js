import React, { useState, useEffect } from 'react';
import api from './services/api';

// ELEMENTOS ESSENCIAIS DO REACT
// 1- Componente: É toda função JavaScript que retorna um conteúdo de view (seja html, css ou um js visual). Por convenção, inicia-se com letra maiúscula e se utiliza apenas 1 por arquivo.
// 2- Propriedade: Informações que o componente PAI passa para o componente FILHO. Exemplo: title=""
// 3- Estado: Informações mantidas pelo componente (Lembrar: Imutabilidade). Em outras palavras, é geralmente usado quando se tem que alterar alguma variável do componente, criando assim, uma nova função dentro do próprio componente.
// *Sobre o Estado: Usa-se o useState (importado lá em cima), que recebe como parâmetro o valor inicial da variável. Este retorna um vetor de dois elementos, onde o primeiro é a variável em si e o segundo é um método que irá CRIAR uma nova variável cujo valor é passado como parâmetro

//import Header from './Header'; // Importa o componente Header criado

import './global.css'; // O import de css tbm é feito no javascript
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// JSX = JavaScript + HTML. Coloca o conteúdo HTML dentro do Js
function App() {

  const [ devs, setDevs ] = useState([]); // Estado que irá listar todos os devs. Ele é iniciado como um array vazio


  // useEffect é uma função do React que chama outras funções sempre que uma variável ou propriedade for alterada. Sem ter que chamar o componente de novo para isso
  // Ele possui como parâmetros, respectivamente, a função que será chamada e a variável gatilho que dispará essa função quando for alterada. Nesse caso, os colchetes vazios indicam que não terá variável nenhuma, disparando na hora que o componente for chamado

  // Listagem
  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data); // A variável de estado dos devs recebe o retorno da listagem de Devs
    }

    loadDevs(); // Chamada da função declarada acima
  }, []); // Também será executado uma única vez, já que não é definido nenhuma variável gatilho para ele

  // Criação de um novo Dev
  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]); // seta na variável de listagem "devs", um novo array (imutabilidade), que recupera os devs já cadastrados no trecho "...devs", juntamente com o dev recém criado (response.data)
  }

  return (
    // Como longitude e latitude usam um estado, o input precisa de um OnChange, que irá sempre atualizar o valor das variáveis longitude e latitude quando o usuário alterar o valor do input
    // A tag aside do html serve para criar as sidebars
    <div id="app">
      <aside> 
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => {
            // O devs.map funciona como um foreach. O map irá percorrer todo o vetor devs
            return(
              // Quando se trata da função .map, devemos passar o id do que foi listado através da propriedade "key". Deve ficar com underlina na frente, no jeito que tá ali "dev._id"
              <DevItem key={dev._id} dev={dev} />
            );
            
          })}
        </ul>
      </main>

    </div>
   
  );
}

export default App;
