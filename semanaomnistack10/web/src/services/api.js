import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

// Permite a comunicação com a aplicação backend cuja porta é 3333

export default api;