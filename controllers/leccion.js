'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Leccion = require('../models/Leccion');
var Curso = require('../models/curso');
var ObjectId = require('mongodb').ObjectId;


//          Obtener 1 contenido 

function getLeccion(req, res) {
    var idCont = req.params.id;

    Leccion.findById(idCont).populate({
        path: 'Curso'
    }).exec((err, contenido) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion al servidor'
            });
        } else {
            if (!contenido) {
                res.status(404).send({
                    message: 'No existe contenido'
                });
            } else {
                res.status(200).send({
                    contenido
                });
            }
        }
    });
}
//          Guradar el Contenido

function saveLeccion(req, res) {
    var leccion = new Leccion();
    var params = req.body;
   leccion.titulo = params.titulo;
   leccion.video=params.video;
   leccion.files='No hay archivos...';
   leccion.curso=params.curso;
   leccion.state=params.state;
    
    leccion.save((err, contSaved) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar en el Servidor'
            });
        }else{
            if (!contSaved) {
                res.status(404).send({
                    message: 'Error al guardar el contenido'
                });
            } else {
                res.status(200).send({
                    contSaved
                });
            }
        }
    });
}
    
//          Obtener todos los contenidos

function getContenidos(req, res) {
    var contId = req.params.id;
    if (!contId) {

        // Si no existe, obtienes todos los contenidos

        var find = Asist.find({}).sort('name');
    } else {
        
        // Mostrar por Id

        var find = Contenido.find({
            curso: cursoId
        }).sort('name');
    }
    find.populate({
        path: 'curso',
       

    }).exec((err, contenidos) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el path'
            });
        } else {
            if (!contenidos) {
                res.status(404).send({
                    message: 'No hay contenido relacionado'
                });
            } else {
                res.status(200).send({
                    contenido: contenidos
                });
            }
        }
    })
}

//          Borrar Contenido            

function deleteContenido(req, res) {
    var contId = req.params.id;
    Contenido.findByIdAndRemove(contId, (err, contRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar el contenido'
            });
        } else {
            if (!contRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar el contenido'
                });
            } else {
                contRemoved
            }
        }
    });
}


module.exports = {
    getLeccion,
    saveLeccion,
    getContenidos,
    deleteContenido
}
