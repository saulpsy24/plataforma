'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoSchema = Schema({
    name: String,
    dateS: String,
    image: String,
    description: String,
    
    event:{
        type: Schema.ObjectId,ref:'Categoria'
    }
        
});

module.exports = mongoose.model('Curso', cursoSchema);