import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css'; // O import de css tbm é feito no javascript
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {

  const [ devs, setDevs ] = useState([]); // Estado que irá listar todos os devs. Ele é iniciado como um array vazio


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
