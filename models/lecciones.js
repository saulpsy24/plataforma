'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< HEAD
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
=======
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
>>>>>>> 5dc9e14d04ec0726f9655099e221d8143f859804
