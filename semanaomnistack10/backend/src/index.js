const express = require('express'); // Importa a biblioteca express
const mongoose = require('mongoose'); // Importa o mongoose
const routes = require('./routes'); // Importa o objeto routes em routes.js
const cors = require('cors');
const http = require('http'); // Recurso do express
const { setupWebsocket } = require('./websocket'); // Importa a função do arquivo websocket.js

// TUDO QUE ESTÁ NESSE ARQUIVO É EXECUTADO NA INICIALIZAÇÃO DO PROGRAMA

const app = express(); // Instância do app utilizando o express

const server = http.Server(app); // Extrai o servidor http da aplicação

setupWebsocket(server); // Passa a instância do servidor para a função setupWebsocket

// Conecta com a string de conexão do banco
mongoose.connect('mongodb+srv://bruno:GostoDeChocolate10@cluster0-slgtr.mongodb.net/primeiroBanco?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// app.use aplica algo para todos os métodos http e não só em um
app.use(cors()); // O cors libera o acesso externo para toda a aplicação
app.use(express.json()); // Especifica que o express reconhecerá qualquer requisição que esteja no formato json
app.use(routes); // Utiliza todas as rotas importadas de routes.js


// O app.get, mostra o que acontece quando chamar a rota principal (nesse caso)
//Possui como parâmetros a requisição (Que vem do que o cliente digitou nos formulários) e a resposta a isso
// Métodos http: get, post, put (atualizar) e delete

// Tipos de parâmetros:
// Query Params: request.query(Usado para filtros, busca, ordenação, paginação etc.); geralmente usada nos métodos post
// Route Params: request.params (identifica um recurso na alteração ou remoção); Utilizado mais nos métodos put e delete, que precisam informar um id de um item, por exemplo
// Body Params: request.body (Dados para criação ou alteração de um registro); Comumente utilizado no POST e no PUT.

/*
app.post('/incluir', (request, response) => {
    //return response.send('Hello World'); // Responde em formato de texto
    console.log(request.body); // exibe no terminal a query passada
    return response.json({message: 'Hello Porra'});  // As chaves dentro do parênteses representam um objeto. Este tem um atributo chamado message.
});
*/

server.listen(3333); // Configura a porta do localhost
