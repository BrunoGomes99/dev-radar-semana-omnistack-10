const Dev = require('../models/Dev');
const ParseStringAsArray = require('../models/utils/ParseStringAsArray');

module.exports = {
    // método de busca de todos os devs num raio de 10km
    // Filtrar por tecnologias
    async index(request, response){
        
        const { latitude, longitude, techs } = request.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,  // O "$in" é um operador do mongo. Verifica se em techs existe algum em comum com techsArray
            },
            location: {
                $near: { // O operador near procura objetos próximos à localização informada
                    $geometry: { // Passa o ponto da coordenada
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, // passa o raio máximo em metros
                }
            }
        });

        return response.json( { devs });

    }
}