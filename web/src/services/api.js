import axios from 'axios';

const api = axios.create({
    baseURL: 'https://radardev-backend.herokuapp.com'
});

// Permite a comunicação com a aplicação backend cuja porta é 3333

export default api;