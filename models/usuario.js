'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    name: String,

    surname: String,
    email: String,

    image: String,


    address: String,

    password: String,
    role: String,

});



module.exports = mongoose.model('Usuario', UsuarioSchema);
