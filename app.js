'use strict'
var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
//cargar rutas
var user_routes = require('./routes/usuario');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json('application/json'));

//configurar cabeceras http
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
    
});
//ruta base
app.use('/api',user_routes);


module.exports = app;