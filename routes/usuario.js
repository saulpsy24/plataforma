'use strict'
var express = require('express');
var UserController = require('../controllers/usuario');
var api = express.Router();
var md_auth= require('../middleware/auth')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/avatar'});
var md_upload1 = multipart({uploadDir:'./uploads/fichas'});



api.post('/store', UserController.storeUser);
api.put('/update',md_auth.ensureAuth,UserController.updateUser);
api.delete('/delete',md_auth.ensureAuth,UserController.deleteUser);
api.get('/usuarios',md_auth.ensureAuth,UserController.getUsuarios);

module.exports = api;