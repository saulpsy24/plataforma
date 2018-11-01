'use strict'
var express = require('express');
var leccionController = require('../controllers/leccion');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');


api.get('/leccion/:id',md_auth.ensureAuth,leccionController.getLeccion);
api.post('/leccion',md_auth.ensureAuth,leccionController.saveLeccion);
api.get('/lecciones/:curso?',md_auth.ensureAuth,leccionController.getLecciones);
api.put('/leccion/:id', md_auth.ensureAuth, leccionController.updateLeccion);
api.delete('/leccion/:id', md_auth.ensureAuth, leccionController.deleteLeccion);


module.exports = api;