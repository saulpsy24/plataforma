'use strict'
var express = require('express');
var UserController = require('../controllers/usuario');
var api = express.Router();
var md_auth= require('../middleware/auth')
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/avatar'});



api.post('/store', UserController.storeUser);
api.put('/update/:id',md_auth.ensureAuth,UserController.updateUser);
api.delete('/delete/:id',md_auth.ensureAuth,UserController.deleteUser);
api.get('/usuarios',md_auth.ensureAuth,UserController.getUsuarios);
api.post('/imguser/:id',[md_auth.ensureAuth,md_upload], UserController.uploadImageUser);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

module.exports = api;