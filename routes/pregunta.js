'use strict'
var express = require('express');
var preguntaController = require('../controllers/pregunta');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/pregunta/:id',md_auth.ensureAuth,preguntaController.getPregunta);
api.post('/pregunta',md_auth.ensureAuth,preguntaController.savePregunta);
api.get('/preguntas/:curso?',md_auth.ensureAuth,preguntaController.getPreguntas);
api.put('/pregunta/:id', md_auth.ensureAuth, preguntaController.updatePregunta);
api.delete('/pregunta/:id', md_auth.ensureAuth, preguntaController.deletePregunta);


module.exports = api;