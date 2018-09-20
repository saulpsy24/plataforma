'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Inscripcion = require('../models/inscripcion');
var Materia = require('../models/materia');

//      Metodo para obtener 1 materia

function getMateria(req, res) {
    var idMateria = req.params.id;

    Materia.findById(idMateria).populate({
        path: 'Inscripcion'
    }).exec((err, materia) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!materia) {
                res.status(404).send({
                    message: 'No existe la materia'
                });
            } else {
                res.status(200).send({
                    materia
                });
            }
        }
    });
}


//      Guardar materia

function saveMateria(req, res) {
    var materia = new Materia();
    var params = req.body;
    materia.name = params.name;
    materia.profesor = params.profesor;
    materia.programa = params.programa;
    materia.inscripcion = params.inscripcion;
    materia.usuario = params.usuario;

    materia.save((err, materiaSaved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });

        } else {
            if (!materiaSaved) {
                res.status(404).send({
                    message: 'Error guardando la materia'
                });
            } else {
                res.status(200).send({
                    materia: materiaSaved
                });
            }
        }
    });
}

//      Metodo para obtener todas las materias

function getMaterias(req, res) {
    var inscripcionId = req.params.inscripcion;
    if (!inscripcionId) {
        //      Sacar todas las materias
        var find = Materia.find({}).sort('name');
    } else {
        //      Mostrar solamente las materias inscritas
        var find = Materia.find({
            inscripcion: inscripcionId
        }).sort('name');
    }
    find.populate({
        path: 'inscripcion'
    }).exec((err, materias) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });
        } else {
            if (!materias) {
                res.status(404).send({
                    message: 'No hay materias asociadas'
                });
            } else {
                res.status(200).send({
                    materias
                });
            }
        }
    })
}

//      Metodo para actualizar 1 materia

function updateMateria(req, res) {
    var materiaId = req.params.id;
    var update = req.body;

    Materia.findByIdAndUpdate(materiaId, update, (err, materiaUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la materia'
            });
        } else {
            if (!materiaUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar la materia'
                });

            } else {
                res.status(200).send({
                    materia: materiaUpdated
                });

            }
        }
    });
}

//      Metodo para borrar 1 materia

function deleteMateria(req, res) {
    var materiaId = req.params.id;
    Materia.findByIdAndRemove(materiaId, (err, materiaRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar la materia'
            });
        } else {
            if (!materiaRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar la materia'
                });
            } else {
                materiaRemoved
            }
        }
    });
}

module.exports = {
    getMateria,
    saveMateria,
    getMaterias,
    updateMateria,
    deleteMateria
}
