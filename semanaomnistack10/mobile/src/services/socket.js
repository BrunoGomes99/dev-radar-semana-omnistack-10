import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.20:3333', {  // O ip 192.168.0.20 é aquele fornecido no canto inferior esquerdo do expo quando este está executando. A porta 3333 é a porta definida no nosso backend
    autoConnect: false,
});

function subscribeToNewDevs(subcribeFunction) {
    // subscribeFunction é uma função de callback do js

    // Quando a função 'new-dev' especificada no backend (DevController.js) for acionada, a função callback subscribeFunction será chamada
    socket.on('new-dev', subcribeFunction);
}

// Conecta ao WebSocket
function connect(latitude, longitude, techs) {
    
    // Envia as informações da busca do usuário como query para o backend
    socket.io.opts.query = { 
        latitude,
        longitude,
        techs,
    };
    
    socket.connect();
}

// Disconecta do WebSocket
function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};