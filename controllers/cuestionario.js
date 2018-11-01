'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Cuestionario = require('../models/cuestionario');
var Curso = require('../models/curso');
var ObjectId = require('mongodb').ObjectId;


//          Obtener 1 cuestionario

function getCuestionario(req, res) {
    var idCuest = req.params.id;

    Cuestionario.findById(idCuest).populate({
        path: 'Curso'
    }).exec((err, cuestionario) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion al servidor'
            });
        } else {
            if (!cuestionario) {
                res.status(404).send({
                    message: 'No existe el cuestionario'
                });
            } else {
                res.status(200).send({
                    cuestionario
                });
            }
        }
    });
}
//          Guradar el cuestionario

function saveCuestionario(req, res) {
    var cuestionario = new Cuestionario();
    var params = req.body;
   cuestionario.titulo = params.titulo;
   cuestionario.descripcion=params.descripcion;
   cuestionario.tiempo=params.tiempo;
   cuestionario.curso=params.curso;
   cuestionario.intentos=params.intentos;
   cuestionario.calificacion=params.calificacion;
    
    cuestionario.save((err, cuestSaved) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar en el Servidor el cuestionario'
            });
        }else{
            if (!cuestSaved) {
                res.status(404).send({
                    message: 'Error al guardar el cuestionario'
                });
            } else {
                res.status(200).send({
                    cuestSaved
                });
            }
        }
    });
}
    
//          Obtener todos los cuestionarios o los relacionados con algún curso

function getCuestionarios(req, res) {
    var cuestId = req.params.id;
    if (!cuestId) {

        // Si no existe, obtienes todos los cuestionarios

        var find = cuestionario.find({}).sort('titulo');
    } else {
        
        // Mostrar por Id 

        var find = leccion.find({
            curso: cursoId
        }).sort('name');
    }
    find.populate({
        path: 'curso',
       

    }).exec((err, cuestionarios) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el path'
            });
        } else {
            if (!cuestionarios) {
                res.status(404).send({
                    message: 'No hay cuestionarios relacionados'
                });
            } else {
                res.status(200).send({
                    cuestionario: cuestionarios
                });
            }
        }
    })
}

//          Actualiza Cuestionario           //

function updateCuestionario(req, res) {
    var cuestId = req.params.id;
    var update = req.body;

    cuestionario.findByIdAndUpdate(cuestId, update, (err, cuestUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el cuestionario'
            });
        } else {
            if (!cuestUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar el cuestionario'
                });
            } else {
                res.status(200).send({
                    cuestionario: cuestUpdated
                });
            }
        }
    });
}

//          Borrar Cuestionario             //           

function deleteCuestionario(req, res) {
    var cuestId = req.params.id;
    cuestionario.findByIdAndRemove(cuestId, (err, cuestRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar el cuestionario'
            });
        } else {
            if (!cuestRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar el cuestionario'
                });
            } else {
                cuestRemoved
            }
        }
    });
}


module.exports = {
    getCuestionario,
    saveCuestionario,
    getCuestionarios,
    updateCuestionario,
    deleteCuestionario
}
