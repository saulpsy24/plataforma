'use strict'
var path = require('path');
var fs = require('fs');
var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var express = require('express');
var router = express.Router;

var moment = require('moment');

const json2csv = require('json2csv').parse;
//revisado y funcionando
function storeUser(req, res) {
    
    var cliente = new Usuario();
    var params = req.body;
    cliente.name = params.name;
    cliente.surname = params.surname;
    cliente.email = params.email;
    cliente.role = 'ROLE_ADMIN';
    cliente.image = 'avatar.png';
    var password = params.password;

    Usuario.findOne({
        'email': cliente.email
    }, function (err, elements) {
        if (!elements) {
           
          
                bcrypt.hash(password, null, null, function (err, hash) {
                    cliente.password = hash;
                    
                });




                cliente.save((err, clienteStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error'
                        });

                    } else {
                        if (!clienteStored) {
                            res.status(404).send({
                                message: 'No se guardo Usuario'
                            });
                        } else {
                            res.status(200).send({
                                token: jwt.createToken(cliente),
                                usuario: clienteStored,
                                
                            });
                        }
                    }
                });
            
        } else {
            res.status(500).send({
                message: 'Ya hay un registro previo',
                token: jwt.createToken(cliente)
            });
        }
    });

}
//falta agregarimagen%
function updateUser(req, res) {

    var idUsuario = req.params.id;


    var update = {
        email: req.body.email,
        image: req.body.image,
        surname: req.body.surname,
        name: req.body.name,
        role: req.body.role,
        password: req.body.password,
    };

    if (update.password) {
        //ecnriptar pasword
        bcrypt.hash(update.password, null, null, function (err, hash) {
            var cliente = hash;
            update.password = cliente;


            Usuario.findByIdAndUpdate(idUsuario, update, (err, clienteUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar usuario'
                    });
                } else {
                    if (!clienteUpdated) {
                        res.status(404).send({
                            message: 'No se pudo actualizar usuario'
                        });

                    } else {
                        res.status(200).send({
                            usuario: update
                        });

                    }
                }
            });
        });

    } else {
        Usuario.findByIdAndUpdate(idUsuario, update, (err, clienteUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar usuario'
                });
            } else {
                if (!clienteUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar usuario'
                    });

                } else {
                    res.status(200).send({
                        usuario: clienteUpdated
                    });

                }
            }
        });
    }

}
//works
function deleteUser(req, res) {



    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, clienteRemovido) => {

        if (err) {
            res.status(500).send({
                message: 'Error al borrar cliente'
            });
        } else {
            if (!clienteRemovido) {
                res.status(404).send({
                    message: 'El cliente no  se pudo eliminar'
                });
            } else {
                res.status(200).send({
                    usuario: clienteRemovido
                });

            }
        }
    });
}
//mostrar usuarios
function getUsuarios(req, res) {
    var userId = req.params.space;
    if (!userId) {
        //sacar todos los albums de la DB
        var find = Usuario.find({}).sort('name');
    } else {
        //mostrar solamente los albums de ese artista
        var find = Usuario.find({
            _id: ObjectId(userId)
        }).sort('name');
    }
    find.exec((err, clientes) => {
        if (err) {
            res.status(500).send({
                message: 'error'
            });
        } else {
            if (!clientes) {
                res.status(404).send({
                    message: 'no hay clientes asociadas'
                });
            } else {
                res.status(200).send({
                    cliente: clientes
                });
            }
        }
    });
}

//agregar imagen
function uploadImageUser(req, res) {
    var clienteId = req.params.id;
    var file_name = 'No Subido...';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
      //  var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
                Usuario.findByIdAndUpdate(clienteId, {
                image: file_name
            }, (err, clienteUpdated) => {

                if (!clienteUpdated) {
                    res.status(404).send({
                        message: 'Ocurrio un error al actualizar Cliente'
                    });

                } else {
                    res.status(200).send({
                        cliente: clienteUpdated,
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
    var path_file = './uploads/avatar/' + imageFile;
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
    storeUser,
    updateUser,
    deleteUser,
    getUsuarios,
    uploadImageUser,
    getImageFile
}