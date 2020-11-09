import axios from 'axios';

const port = process.env.PORT || '3333'

const api = axios.create({
    baseURL: 'http://192.168.0.22:3333', // O ip 192.168.0.20 é aquele fornecido no canto inferior esquerdo do expo quando este está executando. A porta 3333 é a porta definida no nosso backend
});

//127.0.0.1
//192.168.0.20

export default api;