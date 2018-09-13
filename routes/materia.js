'use strict'
var express = require('express');
var materiaController = require('../controllers/materia');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/materia/:id',md_auth.ensureAuth,materiaController.getMateria);
api.post('/materia',md_auth.ensureAuth,materiaController.saveMateria);
api.get('/materias/:inscripcion?',md_auth.ensureAuth,materiaController.getMaterias);
api.put('/materia/:id', md_auth.ensureAuth, materiaController.updateMateria);
api.delete('/materia/:id', md_auth.ensureAuth, materiaController.getMateria);


module.exports = api;