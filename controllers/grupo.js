'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Inscripcion = require('../models/inscripcion');
var Grupo = require('../models/grupo');

//      Metodo para obtener 1 grupo

function getGrupo(req, res) {
    var idGrupo = req.params.id;

    Grupo.findById(idGrupo).populate({
        path: 'Inscripcion'
    }).exec((err, grupo) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!grupo) {
                res.status(404).send({
                    message: 'No existe el grupo'
                });
            } else {
                res.status(200).send({
                    materia
                });
            }
        }
    });
}


//      Guardar grupo

function saveGrupo(req, res) {
    var grupo = new Grupo();
    var params = req.body;
    grupo.name = params.name;
    grupo.grado = params.grado;
    grupo.salon = params.salon;
    grupo.cupo = params.cupo;
    grupo.inscripcion = params.inscripcion;

    grupo.save((err, grupoSaved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });

        } else {
            if (!grupoSaved) {
                res.status(404).send({
                    message: 'Error guardando el grupo'
                });
            } else {
                res.status(200).send({
                    grupo: grupoSaved
                });
            }
        }
    });
}

//      Metodo para obtener todos los grupos

function getGrupos(req, res) {
    var inscripcionId = req.params.inscripcion;
    if (!inscripcionId) {
        //      Sacar todos los grupos
        var find = Grupo.find({}).sort('name');
    } else {
        //      Mostrar solamente los grupos inscritos
        var find = Grupo.find({
            inscripcion: inscripcionId
        }).sort('name');
    }
    find.populate({
        path: 'inscripcion'
    }).exec((err, grupos) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });
        } else {
            if (!grupos) {
                res.status(404).send({
                    message: 'No hay grupos asociados'
                });
            } else {
                res.status(200).send({
                    grupos
                });
            }
        }
    })
}

//      Metodo para actualizar 1 grupo

function updateGrupo(req, res) {
    var grupoId = req.params.id;
    var update = req.body;

    Grupo.findByIdAndUpdate(grupoId, update, (err, grupoUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor al actualizar el grupo'
            });
        } else {
            if (!grupoUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar el grupo'
                });

            } else {
                res.status(200).send({
                    grupo: grupoUpdated
                });

            }
        }
    });
}

//      Metodo para borrar 1 grupo

function deleteGrupo(req, res) {
    var grupoId = req.params.id;
    Grupo.findByIdAndRemove(grupoId, (err, grupoRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor al borrar el grupo'
            });
        } else {
            if (!grupoRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar el grupo'
                });
            } else {
                grupoRemoved
            }
        }
    });
}

module.exports = {
    getGrupo,
    saveGrupo,
    getGrupos,
    updateGrupo,
    deleteGrupo
}
