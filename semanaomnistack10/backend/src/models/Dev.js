const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// Define os atributos que compoem o dev, salvando em um novo esquema no MongoDb
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // Vetor de strings
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema); // Cria no MongoDb, uma "tabela" com nome Dev, que consiste nas informações de DevSchema

