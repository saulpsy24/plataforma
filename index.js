'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/plataforma',  (err,res) => {
  if(err){
      throw err;
  } else{
      console.log("La conexion a base esta corriendo correctamente");
      app.listen(port,function(){
          console.log("servidor del api rest online en http://localhost:"+port) ;
      });
  } 
    
});
