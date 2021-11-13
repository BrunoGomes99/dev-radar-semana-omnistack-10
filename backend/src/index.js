const express = require('express'); // Importa a biblioteca express
const mongoose = require('mongoose'); // Importa o mongoose
const routes = require('./routes'); // Importa o objeto routes em routes.js
const cors = require('cors');
const http = require('http'); // Recurso do express
const { setupWebsocket } = require('./websocket'); // Importa a função do arquivo websocket.js

const app = express(); // Instância do app utilizando o express

const server = http.Server(app); // Extrai o servidor http da aplicação

setupWebsocket(server); // Passa a instância do servidor para a função setupWebsocket

// Conecta com a string de conexão do banco
mongoose.connect('your-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// app.use aplica algo para todos os métodos http e não só em um
app.use(cors()); // O cors libera o acesso externo para toda a aplicação
app.use(express.json()); // Especifica que o express reconhecerá qualquer requisição que esteja no formato json
app.use(routes); // Utiliza todas as rotas importadas de routes.js



server.listen(3333); // Configura a porta do localhost
