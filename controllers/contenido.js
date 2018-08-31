'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Contenido = require('../models/contenido');
var Curso = require('../models/curso');
var ObjectId = require('mongodb').ObjectId;


//          Obtener 1 contenido 

function getContenido(req, res) {
    var idCont = req.params.id;

    Contenido.findById(idCont).populate({
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

function saveContenido(req, res) {
    var contenido = new Contenido();
    var params = req.body;
    contenido.title = params.title;
    contenido.src = params.src;
    contenido.description = params.description;
    contenido.curso = params.curso;
    
    contenido.save((err, contSaved) => {
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
    getContenido,
    saveContenido,
    getContenidos,
    deleteContenido
}
