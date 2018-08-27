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
                    cliente: clienteStored
                });
            }
        }
    });
}}else{
    res.status(500).send({message:'Ya hay un registro previo'});
}});
    
}

module.exports = {
      storeUser
}