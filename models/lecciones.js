'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leccionesSchema = Schema({
    titulo: String,
    video: String,
    files: String,
    curso:{
        type: Schema.ObjectId,ref:'Curso'
    },
    state:String,
        
});

module.exports = mongoose.model('Lecciones', leccionesSchema);
