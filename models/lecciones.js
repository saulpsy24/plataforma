'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leccionSchema = Schema({
    titulo: String,
    image: String,
    video: String,
    files:String,
    curso:{
        type: Schema.ObjectId,ref:'Curso'
    },
    state:String   
        
});

module.exports = mongoose.model('Leccion', leccionSchema);