'use strict'
var express = require('express');
var cuestionarioController = require('../controllers/cuestionario');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/cuestionario/:id',md_auth.ensureAuth,cuestionarioController.getCuestionario);
api.post('/cuestionario',md_auth.ensureAuth,cuestionarioController.saveCuestionario);
api.get('/cuestionarios/:curso?',md_auth.ensureAuth,cuestionarioController.getCuestionarios);
api.put('/cuestionario/:id', md_auth.ensureAuth, cuestionarioController.updateCuestionario);
api.delete('/cuestionario/:id', md_auth.ensureAuth, cuestionarioController.deleteCuestionario);


module.exports = api;