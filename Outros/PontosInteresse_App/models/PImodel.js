const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//geolocation Schema
const GeoSchema = new Schema({
    type:{
        type:String,
        default:'point'
    },
    coordinates:{
        type:[Number],
        index:'2dsphere'
    }
});

//PI Schema
const PISchema = new Schema({
    name: {
        type: String,
        required: [true, 'Campo obrigatório!']
    },
    details: {
        type: String
    },
    status:{
        type:Boolean,
        default:true
    },
    geometry:GeoSchema
});

//criar modelo PI baseado no Schema
const PI = mongoose.model('PontosInteresse', PISchema);

module.exports = PI;