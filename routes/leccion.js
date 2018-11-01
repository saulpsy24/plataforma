'use strict'
var express = require('express');
var contenidoController = require('../controllers/contenido');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/contenido/:id',md_auth.ensureAuth,contenidoController.getContenido);
api.post('/contenido',md_auth.ensureAuth,contenidoController.saveContenido);
api.get('/contenido/:curso?',md_auth.ensureAuth,contenidoController.getContenidos);
// api.put('/curso/:id', md_auth.ensureAuth, contenidoController.updateContenido);
api.delete('/contenido/:id', md_auth.ensureAuth, contenidoController.deleteContenido);


module.exports = api;