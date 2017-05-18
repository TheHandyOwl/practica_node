"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const authenticate = require('../../lib/authenticate');

//POST /api_v1/signIn {user: 'James', pass: 'passwordJames'}
router.post( '/', function (req, res, next) {

    if(!req.body.nombre){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca nombre de usuario para validarse' } } );
        return;
    }
    if(!req.body.clave){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca clave de usuario para validarse' } } );
        return;
    }

    Usuario.findOne({ nombre : req.body.nombre }).exec((err, usuario) => {
        if (err) {
            next(err);
            return;
        }
        if ( usuario === null ) {
            res.json( { success: false, result: {error: 401, message: 'Acceso denegado' } } );
            return;
        }
        if ( usuario.clave !== authenticate.hashIt(req.body.clave) ) {
            res.json( { success: false, result: {error: 401, message: 'Acceso denegado' } } );
            return;
        }
        
       // Crear un token
        var token = authenticate.signIt(usuario._id);
        res.json( {success: true, result: {message: 'Usuario autenticado', token: token} } );
        return;

    });

});

module.exports = router;