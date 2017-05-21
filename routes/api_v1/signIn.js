"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const authenticate = require('../../lib/authenticate');

//POST /api_v1/signIn {email: 'james@invalid.com', clave: 'passwordJames'}
router.post( '/', function (req, res, next) {

    if(!req.body.email){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca email de usuario para validarse' } } );
        res.status(401);
        return;
    }
    if(!req.body.clave){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca clave de usuario para validarse' } } );
        res.status(401);
        return;
    }

    Usuario.findOne({ email : new RegExp( (req.body.email), 'ig' ) }).exec((err, usuario) => {
        if (err) {
            next(err);
            return;
        }
        if ( usuario === null ) {
            res.json( { success: false, result: {error: 401, message: 'Acceso denegado' } } );
            res.status(401);
            return;
        }
        if ( usuario.clave !== authenticate.hashIt(req.body.clave) ) {
            res.json( { success: false, result: {error: 401, message: 'Acceso denegado' } } );
            res.status(401);
            return;
        }

       // Crear un token
        var token = authenticate.signIt(usuario._id);
        res.json( {success: true, result: {message: 'Usuario autenticado', token: token} } );
        return;

    });

});

module.exports = router;
