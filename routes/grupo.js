'use strict'
var express = require('express');
var grupoController = require('../controllers/grupo');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/grupo/:id',md_auth.ensureAuth,grupoController.getGrupo);
api.post('/grupo',md_auth.ensureAuth,grupoController.saveGrupo);
api.get('/grupos/:inscripcion?',md_auth.ensureAuth,grupoController.getGrupos);
api.put('/grupo/:id', md_auth.ensureAuth, grupoController.updateGrupo);
api.delete('/grupo/:id', md_auth.ensureAuth, grupoController.deleteGrupo);


module.exports = api;