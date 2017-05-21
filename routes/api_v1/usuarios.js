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
        res.json({ success: false, result: { error: 401, mensaje: "Tu petición no tiene cabecera de autorización"}});
        res.status(401);
        return;
    }
    let decoded = authenticate.validateIt(token);
    if(!decoded || decoded.message){
        res.json( { success: false, result: { error: 403, mensaje: 'El token no es válido o ha expirado.'} } );
        res.status(403);
        return;
    }

    Usuario.findOne( { nombre: new RegExp( (req.params.nombre), 'ig' ) } ).exec((err, usuario) => {
        if (err) {
            res.json( { success: false, result: { mensaje: 'Error al buscar el usuario ' + req.params.nombre, token: token, decoded: decoded } } );
            res.status(500);
            return err;
        }
        if (!usuario) {
            res.json( { success: false, result: { mensaje: 'No se ha encontrado el usuario ' + req.params.nombre, token: token, decoded: decoded } } );
            res.status(404);
            return;
        }
        const infoPublicaUsuario = {
            nombre: usuario.nombre,
            fecha_alta: usuario.created_at
        };
        const infoPrivadaUsuario = {
            nombre: usuario.nombre,
            email: usuario.email,
            lang: usuario.lang,
            altaUsuario: usuario.created_at
        };

        res.json( { success: true,
            result: {
                mensaje: 'Información pública del usuario ' + req.params.nombre,
                infoPublicaUsuario: infoPublicaUsuario,
                infoPrivadaUsuario: infoPrivadaUsuario,
                infoServer: { mensaje: 'Otra información del servidor',
                    token: token,
                    decoded: decoded
                }
            }
        });

    } );

});

module.exports = router;