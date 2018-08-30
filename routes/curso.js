'use strict'
var express = require('express');
var cursoController = require('../controllers/curso');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/curso/:id',md_auth.ensureAuth,cursoController.getCurso);
api.post('/curso',md_auth.ensureAuth,cursoController.saveCurso);
api.get('/cursos/:categoria?',md_auth.ensureAuth,cursoController.getCursos);
api.put('/curso/:id', md_auth.ensureAuth, cursoController.updateCurso);
api.delete('/curso/:id', md_auth.ensureAuth, cursoController.deleteCurso);


module.exports = api;