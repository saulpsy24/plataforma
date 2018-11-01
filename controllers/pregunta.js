'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Pregunta = require('../models/pregunta');
var Curso = require('../models/curso');
var ObjectId = require('mongodb').ObjectId;


//          Obtener 1 pregunta        //

function getPregunta(req, res) {
    var idPreg = req.params.id;

    Pregunta.findById(idPreg).populate({
        path: 'Cuestionario'
    }).exec((err, pregunta) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion al servidor'
            });
        } else {
            if (!pregunta) {
                res.status(404).send({
                    message: 'No existe la pregunta'
                });
            } else {
                res.status(200).send({
                    pregunta
                });
            }
        }
    });
}
//          Guradar la pregunta

function savePregunta(req, res) {
    var pregunta = new Pregunta();
    var params = req.body;
   pregunta.titulo = params.titulo;
   pregunta.enunciado=params.enunciado;
   pregunta.valor=params.valor;
    
    pregunta.save((err, pregSaved) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar en el Servidor al guardar la pregunta'
            });
        }else{
            if (!pregtSaved) {
                res.status(404).send({
                    message: 'Error al guardar la pregunta'
                });
            } else {
                res.status(200).send({
                    pregSaved
                });
            }
        }
    });
}
    
//          Obtener todas las preguntas o las relacionadas con algún cuestionario

function getPreguntas(req, res) {
    var pregId = req.params.id;
    if (!pregId) {

        // Si no existe, obtienes todas las preguntas

        var find = pregunta.find({}).sort('titulo');
    } else {
        
        // Mostrar por Id 

        var find = pregunt.find({
            cuestionario: cuestionarioId
        }).sort('titulo');
    }
    find.populate({
        path: 'cuestionario',
       

    }).exec((err, preguntas) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el path'
            });
        } else {
            if (!preguntas) {
                res.status(404).send({
                    message: 'No hay preguntas relacionadas'
                });
            } else {
                res.status(200).send({
                    pregunta: preguntas
                });
            }
        }
    })
}

//          Actualiza Pregunta           //

function updatePregunta(req, res) {
    var pregId = req.params.id;
    var update = req.body;

    pregunta.findByIdAndUpdate(pregId, update, (err, pregUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la pregunta'
            });
        } else {
            if (!pregUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar la pregunta'
                });
            } else {
                res.status(200).send({
                    pregunta: pregUpdated
                });
            }
        }
    });
}

//          Borrar Pregunta            //           

function deletePregunta(req, res) {
    var pregId = req.params.id;
    pregunta.findByIdAndRemove(pregId, (err, pregRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar la pregunta'
            });
        } else {
            if (!pregRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar la pregunta'
                });
            } else {
                pregRemoved
            }
        }
    });
}


module.exports = {
    getPregunta,
    savePregunta,
    getPreguntas,
    updatePregunta,
    deletePregunta
}
