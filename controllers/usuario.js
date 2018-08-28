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

function storeUser(req, res) {
    var cliente = new Usuario();
    var params = req.body;
    cliente.name = params.name;
    cliente.surname = params.surname;
    cliente.email = params.email;
    cliente.role = params.role;
    cliente.image = 'avatar.png';    
    cliente.address = params.address;    
   var  password=params.password;

   Usuario.findOne({
    'email': cliente.email
}, function (err, elements) {
    if(!elements){

  
    if (password) {
        //ecnriptar pasword
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
                    token:jwt.createToken(cliente),
                    usuario: clienteStored
                });
            }
        }
    });
}}else{
    res.status(500).send({message:'Ya hay un registro previo',
                            token: jwt.createToken(cliente)
                            });
}});
    
}
function updateUser (req, res){
    
    var idUsuario = req.params.id;

    var update = {
        email: req.body.email,
        image: req.body.image,
        surname: req.body.surname,
        name: req.body.name,
        role: req.body.role,
        password:req.body.password,
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
                            message: 'entro al metodo',
                            usuario: clienteUpdated
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

module.exports = {
      storeUser,
      updateUser,
      deleteUser,
      getUsuarios
}