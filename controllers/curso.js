'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var categoria = require('../models/categoria');
var Curso = require('../models/curso');

//          Obtener 1 Curso            //

function getCurso(req, res) {
    var idcurso = req.params.id;

    Curso.findById(idcurso).populate({
        path: 'categoria'
    }).exec((err, Curso) => {
        if (err) {
            res.status(500).send({
                message: 'error en la peticion'
            });
        } else {
            if (!Curso) {
                res.status(404).send({
                    message: 'El curso no existe'
                });
            } else {
                res.status(200).send({
                    Curso
                });
            }
        }
    });
}

//          Guardar Curso            //

function saveCurso(req, res) {
    var curso = new Curso();
    var params = req.body;
    curso.name=params.name;
    curso.description=params.description;
    curso.value=params.value;
    curso.rating=params.rating;
    curso.promocional=params.promo;
    curso.categoria=params.categoria;
    curso.instructor=params.instructor;
    curso.image='select one..'

    curso.save((err, cursoSaved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor',
                error:err
            });

        } else {
            if (!cursoSaved) {
                res.status(404).send({
                    message: 'Error al guardar el curso'
                });
            } else {
                res.status(200).send({
                    curso: cursoSaved
                });
            }
        }
    });
}

//          Obtener todos los Cursos            //
function getCursos(req, res) {
    var categotiaId=req.params.id;
    if (!categotiaId) {

        // Obtener todos los cursos de la base
        var find = Curso.find({}).sort('name');
    } else {

        // Obtener cursos por categoria
        var find = Curso.find({
            categoria: categotiaId
        }).sort('name');
    }
    find.populate({
        path: 'categoria'
    }).populate({
        path:'instructor'
    }).exec((err, cursos) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el Servidor'
            });
        } else {
            if (!cursos) {
                res.status(404).send({
                    message: 'No existen cursos asociados'
                });
            } else {
                res.status(200).send({
                    cursos
                });
            }
        }
    })
}

//          Actualiza Curso            //
function updateCurso(req, res) {
    var cursoId = req.params.id;
    var update = req.body;

    Curso.findByIdAndUpdate(cursoId, update, (err, cursoUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el curso'
            });
        } else {
            if (!cursoUpdated) {
                res.status(404).send({
                    message: 'No se pudo actualizar el curso'
                });
            } else {
                res.status(200).send({
                    Curso: cursoUpdated
                });
            }
        }
    });
}

//          Borrar Curso            //

function deleteCurso(req, res) {
    var cursoId = req.params.id;
    Curso.findByIdAndRemove(cursoId, (err, cursoRemoved) => {
       
        if (err) {
            res.status(500).send({
                message: 'Error al borrar el curso'
            });
        } else {
            if (!cursoRemoved) {
                res.status(404).send({
                    message: 'No se pudo borrar el curso'
                });
            } else {
                contenido.find({
                    curso: cursoRemoved._id
                }).remove((err, contenidoRemoved) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error en el servidor al borrar el contenido'
                        });
                    } else {
                        if (!contenidoRemoved) {
                            res.status(404).send({
                                message: 'No se pudo borrar el contenido'
                            });
                        } else {
                            res.status(200).send({
                                Curso: cursoRemoved
                            });

                        }
                    }
                });

            }
        }
    });
}



module.exports = {
    getCurso,
    saveCurso,
    getCursos,
    updateCurso,
    deleteCurso
}
