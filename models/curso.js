'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoSchema = Schema({
    name: String,
    image: String,
    description: String,
    value:String,
    instructor:{
        type: Schema.ObjectId,ref:'Usuario'
    },
    rating:String,
    promocional:String,
    categoria:{
        type:Schema.ObjectId,ref:'Categoria'
    }
        
});

module.exports = mongoose.model('Curso', cursoSchema);