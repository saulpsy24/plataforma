'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscripcionSchema = Schema({
    usuario:{
        type: Schema.ObjectId, ref:'Usuario'
    },
   materia:{
       type: Schema.ObjectId,ref:'Materia'
   },
   grupo:{
        type: Schema.ObjectId,ref:'Grupo'
    },

   name: String,
   profesor: String,
   programa: String
        
});

module.exports = mongoose.model('Inscripcion', inscripcionSchema);