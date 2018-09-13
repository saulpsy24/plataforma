'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materiaSchema = Schema({
   inscripcion:{
       type: Schema.ObjectId,ref:'Inscripcion'
   },
   name: String,
   profesor: String,
   salon: String,
   cupo: Number,
   programa: String
        
});

module.exports = mongoose.model('Materia', materiaSchema);