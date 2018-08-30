'use strict'
var path = require('path');
var fs = require('fs');
var Categoria = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var express = require('express');
var router = express.Router;


function saveCateogira(req, res) {
    var categoria = new Categoria();
    var params = req.body;
    categoria.name = params.name;
    categoria.descripcion = params.descripcion;
  

   Categoria.findOne({
    'nombre': categoria.name
}, function (err, elements) {
    if(!elements){  
     categoria.save((err, categoriaStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al almacenar la categoria'
            });

        } else {
            if (!categoriaStored) {
                res.status(404).send({
                    message: 'No se guardo categoria'
                });
            } else {
                res.status(200).send({
                    categoria: categoriaStored
                });
            }
        }
    });
}else{
    res.status(500).send({message:'Ya hay una categoria con el mismo nombre',
                            categorias:elements
                            
                            });
}});
    
}
function updateCategoria (req, res){
    
    var idCategoria = req.params.id;

    var update = {
        nombre:req.body.nombre,
        descripcion:req.body.descripcion
    };

     
        Categoria.findByIdAndUpdate(idCategoria, update, (err, categoriaUpdated) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al actualizar categoria'
                });
            } else {
                if (!categoriaUpdated) {
                    res.status(404).send({
                        message: 'No se pudo actualizar categoria'
                    });

                } else {
                    res.status(200).send({
                        categoria: categoriaUpdated,
                        message:'Categoria actualizada correctamente'
                    });

                }
            }
        });
    

}

function deleteCategoria(req, res) {



    var id = req.params.id;
    
    Categoria.findByIdAndRemove(id, (err, categoriaRemovida) => {

        if (err) {
            res.status(500).send({
                message: 'Error al borrar categoria'
            });
        } else {
            if (!categoriaRemovida) {
                res.status(404).send({
                    message: 'La categoria no  se pudo eliminar'
                });
            } else {
                res.status(200).send({
                    categoria: categoriaRemovida
                });

            }
        }
    });
}

function getCategorias(req, res) {
    var categoriaID = req.params.id;
    if (!categoriaID) {
        //sacar todas las categorias de la DB
        var find = Categoria.find({});
    } else {
        
        var find = Categoria.find({
            _id: ObjectId(categoriaID)
        });
    }
    find.exec((err, categorias) => {
        if (err) {
            res.status(500).send({
                message: 'Error al buscar categorias'
            });
        } else {
            if (!categorias) {
                res.status(404).send({
                    message: 'No hay categorias registradas'
                });
            } else {
                res.status(200).send({
                    categorias: categoriaID
                });
            }
        }
    });
}

module.exports = {
      saveCateogira,
      updateCategoria,
      deleteCategoria,
      getCategorias
}