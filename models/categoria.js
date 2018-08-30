'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    name: String,
    descripcion:String,


});



module.exports = mongoose.model('Categoria', CategoriaSchema);