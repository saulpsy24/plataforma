'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contSchema = Schema({
    title: String,
    src: String,
    description: String,

    curso:{
       type: Schema.ObjectId,ref:'Curso'
   },
        
});

module.exports = mongoose.model('Contenido', contSchema);