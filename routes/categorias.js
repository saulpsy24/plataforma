'use strict'
var express = require('express');
var categoriaController = require('../controllers/categoria');
var api = express.Router();
var md_auth= require('../middleware/auth')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/avatar'});
var md_upload1 = multipart({uploadDir:'./uploads/fichas'});



api.post('/categoria/save',md_auth.ensureAuth, categoriaController.saveCateogira);
api.put('/categoria/update/:id',md_auth.ensureAuth,categoriaController.updateCategoria);
api.delete('/categoria/delete/:id',md_auth.ensureAuth,categoriaController.deleteCategoria);
api.get('/categoria/get/:id?',md_auth.ensureAuth,categoriaController.getCategorias);

module.exports = api;