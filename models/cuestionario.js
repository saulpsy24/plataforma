var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cuestionarioSchema = Schema({
    titulo: String,
    descripcion: String,
    tiempo: String,
    curso:{
        type: Schema.ObjectId,ref:'Curso'
    },
    intentos:String,
    calificacion:String,
        
});

module.exports = mongoose.model('Cuestionario', cuestionarioSchema);
