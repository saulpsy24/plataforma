'use strict'
var express = require('express');
var cursoController = require('../controllers/curso');
var api = express.Router();
var md_auth= require('../middleware/auth');
var multipart = require('connect-multiparty');

var md_upload = multipart({uploadDir:'./uploads/cursos/'});


api.get('/curso/:id',md_auth.ensureAuth,cursoController.getCurso);
api.post('/curso',md_auth.ensureAuth,cursoController.saveCurso);
api.get('/cursos/:id?',md_auth.ensureAuth,cursoController.getCursos);
api.put('/curso/:id', md_auth.ensureAuth, cursoController.updateCurso);
api.delete('/curso/:id', md_auth.ensureAuth, cursoController.deleteCurso);

api.post('/imgcurso/:id',[md_auth.ensureAuth,md_upload], cursoController.uploadCourseImage);
api.get('/get-image-curso/:imageFile',cursoController.getImageFile);


module.exports = api;