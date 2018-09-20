'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materiaSchema = Schema({
   inscripcion:{
       type: Schema.ObjectId,ref:'Inscripcion'
   },
   usuario:{
        type: Schema.ObjectId,ref:'Usuario'
    },
   name: String,
   profesor: String,
   programa: String
        
});

module.exports = mongoose.model('Materia', materiaSchema);