const axios = require('axios'); // Importa o axios
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../models/utils/ParseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');
// index, show, store, update, destroy (padrão de nomes utilizados para métodos em controllers, uso opcional)
// listar todos, listar só um, criar, atualizar, excluir

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {    
        const { github_username, techs, latitude, longitude } = request.body; // Salva no objeto github_username o texto resultante do request.body
        
        // let é utilizado pra declarar uma variável
        // Busca na "tabela" Dev do banco de dados se já existe um dev com o mesmo "github_username" que foi informado pelo usuário
        let dev = await Dev.findOne({ github_username });

        // Se ainda não existir, cria um registro novo pra ele
        if(!dev){
        
            // Usa crase na string para conseguir concatenar com o objeto
            // Chama a api do github passando o nome de usuário digitado no front-end.
            //Por se tratar de uma chamada a uma API, usa-se o await, que garante que a execução só passe para a próxima linha após terminar de executar essa
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            // name = login, significa que se o name não existir em apiResponse.data, o mesmo será substituído pelo login
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = ParseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                location,
                techs: techsArray // Só esse ficou assim, pq o nome no modelo tá diferente do nome da variável que a gente quer "techsArray"
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, // São passadas as duas como um só parâmetro coordinates
                techsArray,
            )
            
            // Após filtrar os novos devs com a busca atual (feito na função acima), serão passados:
            // O array sendSocketMessageTo, contendo quais novos devs serão exibidos em tempo real;
            // O título tipo da mensagem (new-dev);
            // E os dados do novo dev recém inserido
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }        
    
        return response.json(dev);
    }
}