var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preguntaSchema = Schema({
    titulo:{
        type: Schema.ObjectId,ref:'Cuestionario'
    },
    enunciado:String,
    valor:String,
        
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
