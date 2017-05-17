"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');

//POST /apiv1/authenticate {user: 'James', pass: 'passwordJames'}
router.post( '/authenticate', function (req, res, next) {

    console.log(req.body);

    if(!req.body.nombre){
        res.json( { success: false, result: 'Introduzca nombre de usuario para validarse' } );
        return;
    }
    if(!req.body.clave){
        res.json( { success: false, result: 'Introduzca clave de usuario para validarse' } );
        return;
    }

    Usuario.findOne({ nombre : req.body.nombre }).exec((err, usuario) => {
        console.log ('Err:', err, 'Usuario', usuario);
        if (err) {
            next(err);
            return;
        }
        if ( usuario === null ) {
            res.json( { success: false, result: 'Acceso denegado' } );
            return;
        }
        if ( usuario.clave !== req.body.clave ) {
            res.json( { success: false, result: 'Acceso denegado' } );
            return;
        }

        res.json( { success: true, result: usuario } );

    });

});

module.exports = router;