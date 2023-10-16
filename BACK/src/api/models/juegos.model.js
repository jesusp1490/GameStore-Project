const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Para utilizar mongoose//
const juegoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {type: String, required: true},
    playerNumber : {type: Number},
    price: {type: Number, required: true},
    developer: {type: String, required: true},
    releaseDate: {type: Date, required: true},
    image: {type: String, default: ""},
    category: {type: String, enum: ['new', 'popular']}
},{
collection: 'juego'
});
//en las primeras llaves se situan los datos que podemos introducir cuando hacemos post, si añadimos el atributo required será obligatorio.//
//posibles tipos de datos: string, number, array, date, mixed, boolean, objectId//
const Juego = mongoose.model('juego', juegoSchema)
module.exports = Juego;