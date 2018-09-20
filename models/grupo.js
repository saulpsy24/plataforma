'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grupoSchema = Schema({
   inscripcion:{
       type: Schema.ObjectId,ref:'Inscripcion'
   },
   name: String,
   grado: String,
   salon: String,
   cupo: Number
        
});

module.exports = mongoose.model('Grupo', grupoSchema);