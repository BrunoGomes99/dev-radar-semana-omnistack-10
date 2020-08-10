import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.20:3333', // O ip 192.168.0.20 é aquele fornecido no canto inferior esquerdo do expo quando este está executando. A porta 3333 é a porta definida no nosso backend
});

export default api;