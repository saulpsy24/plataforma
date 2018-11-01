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
    }).populate({
        path:'instructor'
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
                Lecciones.find({
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


//agregar imagen
function uploadCourseImage(req, res) {
    var courseID = req.params.id;
    var file_name = 'No Subido...';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
      //  var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
                Curso.findByIdAndUpdate(courseID, {
                image: file_name
            }, (err, cursoUpdated) => {

                if (!cursoUpdated) {
                    res.status(404).send({
                        message: 'Ocurrio un error al actualizar Curso'
                    });

                } else {
                    res.status(200).send({
                        curso: cursoUpdated,
                        image: file_name
                    });

                }

            });
        } else {
            res.status(200).send({
                message: 'Extension del archivo no valido'
            });
        }

    } else {
        res.status(200).send({
            message: 'No has cargado ninguna imagen'
        });
    }
}
//obtener imagen de cliente
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/cursos/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: 'No existe la imagen'
            });
        }
    });

}



module.exports = {
    getCurso,
    saveCurso,
    getCursos,
    updateCurso,
    deleteCurso,
    uploadCourseImage,
    getImageFile
}
