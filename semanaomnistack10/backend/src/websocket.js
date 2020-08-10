const socketio = require('socket.io');
const parseStringAsArray = require('./models/utils/ParseStringAsArray');
const calculateDistance = require('./models/utils/calculateDistance');
const connections = []; // Armazena todas as conexões realizadas, juntamente com o id do socket e as informações de busca do usuário (coordenadas e tecnologias)

let io;

// Esse formato de função é a mesma coisa de apenas declarar a função normalmente e depois usar um "exports default setupWebsocket"
exports.setupWebsocket = (server) => {
    io = socketio(server); // Instância do servidor

    // Essa estrutura é semelhante à do on click, on change (trabalhada nos projetos .net)
    // Quer dizer que toda vez que o usuário se conectar à aplicação utilizando um protocolo WebSocket, a função vai receber um objeto socket
    io.on("connection", socket => {
        const { latitude, longitude, techs } = socket.handshake.query; // Recebe o resultado da query passada no frontend do mobile

        // Essas conexões correspondem à busca sendo feito pelo usuário em tempo real. Logo, essas informações de coordenadas e tecnologias se referem ao momento da busca

        // push insere itens no array
        connections.push({
            id: socket.id,
            coordinates: {
                // latitude e longitude são convertidas de string para formato numérico
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });

    });
};


// Essa função será responsável por filtrar se o dev que está sendo criado, corresponde as buscas do usuário (se possui pelo menos uma tecnologia em comum e se está em um raio de 10km da localização atual no mapa)
// Se o Dev que está sendo criado corresponder a essas buscas da conexão atual, o mesmo irá aparecer em tempo real no mapa para o usuário
exports.findConnections = (coordinates, techs) => {
    // filter é uma função do js que percorre o array
    return connections.filter(connection => {
        // A primeira condição abaixo é referente à função de cálculo de distância. Passa as coordenadas do dev inserido como primeiro parâmetro e as coordenadas buscadas da conexão atual como segundo parametro. Verifica se é menor que 10 (em km)
        return calculateDistance(coordinates, connection.coordinates) < 10
               && connection.techs.some(item => techs.includes(item));
        // A segunda condição verifica se nas techs buscada pelo usuário (connections) existe algum item em comum com as tecnologias do dev que está sendo criado.
        // O "some" funciona como o "Any" do C#. E o "includes"  verifica se naquele array "tehcs", existe algum elemento igual a "item"
    });
}


// Função destinada a especificar para quem será mostrado em tempo real o novo dev cadastrado
// Os parâmetros são para quem será mostrado, o tipo da mensagem mostrado e a informação da mensagem
exports.sendMessage = (to, message, data) => {
    // Para cada conexão, será enviado o Id do socket e emitida uma mensagem do tipo message e com as informações de data
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}