"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const authenticate = require('../../lib/authenticate');

var jwt = require('jsonwebtoken');

/* GET /api_v1/usuarios/:id */
router.get('/:nombre', (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.token;
    if(!token) {
        return res.json({ success: false, result: { error: 401, mensaje: "Tu petición no tiene cabecera de autorización"}});
    }
    let message = authenticate.validateIt(token);
    if(message.result.error){
        res.json( message );
        return;
    }

    console.log('Usuario: ', req.params.nombre);
    Usuario.findOne( { nombre: req.params.nombre} ).exec((err, usuario) => {
        console.log('Usuario: ', usuario);
        if (err) {
            next(err);
            return;
        }
        if ( usuario !== null ) {
            message.result.usuario = {
                nombre: usuario.nombre,
                fecha_alta: usuario.created_at
            };
        }
    res.json( message );

    });

});

module.exports = router;