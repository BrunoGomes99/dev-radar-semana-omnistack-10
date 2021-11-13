const { Router } = require('express'); // Importa apenas o módulo de roteamento do express que tá declarado em index.js
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); // Cria a rota de listagem de Devs
routes.post('/devs', DevController.store); // Cria a rota para a criação de Devs

routes.get('/search', SearchController.index); // Cria a rota para busca de devs

module.exports = routes; // Exporta o objeto routes para ser acessado por outros arquivos