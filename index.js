'use strict'
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/plataforma',(err,res)=>
{
    if(err){
        throw err;
    }else{
        console.log ("Conexion a la Base de datos corriendo correctamente");
    }
});
