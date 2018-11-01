'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Leccion = require('../models/leccion');
var Curso = require('../models/curso');
var ObjectId = require('mongodb').ObjectId;


//          Obtener 1 leccion

function getLeccion(req, res) {
    var idLec = req.params.id;

    Leccion.findById(idLec).populate({
        path: 'Curso'
    }).exec((err, leccion) => {
        if (err) {
            res.status(500).send({
                message: 'Error al obtener la leccion en el servidor'
            });
        } else {
            if (!leccion) {
                res.status(404).send({
                    message: 'No existe la leccion'
                });
            } else {
                res.status(200).send({
                    leccion
                });
            }
        }
    });
}
//          Guradar la leccion

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
                message: 'Error al guardar la leccion en el Servidor'
            });
        }else{
            if (!contSaved) {
                res.status(404).send({
                    message: 'Error al guardar la leccion'
                });
            } else {
                res.status(200).send({
                    contSaved
                });
            }
        }
    });
}
    
//          Obtener todas las lecciones o las relacionados con algún curso

function getLecciones(req, res) {
    var lecId = req.params.id;
    if (!lecId) {

        // Si no existe, obtienes todas las lecciones

        var find = leccion.find({}).sort('titulo');
    } else {
        
        // Mostrar por Id 

        var find = leccion.find({
            curso: cursoId
        }).sort('name');
    }
    find.populate({
        path: 'curso',
       

    }).exec((err, lecciones) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el path'
            });
        } else {
            if (!lecciones) {
                res.status(404).send({
                    message: 'No hay lecciones relacionadas'
                });
            } else {
                res.status(200).send({
                    leccion: lecciones
                });
            }
        }
    })
}

//          Actualiza Leccion            //

function updateLeccion(req, res) {
    var lecId = req.params.id;
    var update = req.body;

    leccion.findByIdAndUpdate(lecId, update, (err, lecUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la leccion'
            });
        } else {
            if (!lecUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar la leccion'
                });
            } else {
                res.status(200).send({
                    Leccion: lecUpdated
                });
            }
        }
    });
}

//          Borrar Leccion          //            

function deleteLeccion(req, res) {
    var lecId = req.params.id;
    leccion.findByIdAndRemove(lecId, (err, lecRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar la leccion'
            });
        } else {
            if (!lecRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar la leccion'
                });
            } else {
                lecRemoved
            }
        }
    });
}


module.exports = {
    getLeccion,
    saveLeccion,
    getLecciones,
    updateLeccion,
    deleteLeccion
}
