import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){

    const [ github_username, setGithubUsername ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ latitude, setLatitude ] = useState(''); // Os valores iniciais são strings vazias pois ainda não leu a localização
    const [ longitude, setLongitude ] = useState('');

    useEffect(() => {
        // essa função de geolocalização é do próprio navegador
        navigator.geolocation.getCurrentPosition(
          //callbacks da função
          (position) => {
            const { latitude, longitude } = position.coords;
          
            setLatitude(latitude); // Novo valor para latitude
            setLongitude(longitude); // Novo valor para longitude
          },
          (err) => {
            console.log(err); // caso haja erro
          },
          {
            timeout: 30000,
          }
        )
      }, []);

    async function handleSubmit(e) {
        e.preventDefault();  // Previne o comportamento padrão do form no html, que muda a página após o submit

        // Chama a função handleAddDev de App.js, que é passada como parâmetro para o componente App.js
        await onSubmit({
                github_username,
                techs,
                latitude,
                longitude,
        });
        
        /* Após a chamada do post, limpa-se os campos de username_github e tecnologias */
        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>

        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
        </div>

        <div className="input-group">            
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}/>
          </div>

          
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
          </div>
        </div>

        <button type="submit">Salvar</button>

      </form>
    );

}

export default DevForm;