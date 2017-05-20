"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const authenticate = require('../../lib/authenticate');
const modelsConfig = require('../../config/modelsConfig');

var jwt = require('jsonwebtoken');

/* GET /api_v1/tags */
router.get('/', (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.token;
    if(!token) {
        res.json({ success: false, result: { error: 401, mensaje: "Tu petición no tiene cabecera de autorización"}});
        return;
    }
    let decoded = authenticate.validateIt(token);
    if(!decoded || decoded.message){
        res.json( { success: false, result: { error: 403, mensaje: 'El token no es válido o ha expirado.'} } );
        return;
    }

    res.json( { success: true,
        result: {
            mensaje: 'Listado de etiquetas: ' + modelsConfig.anuncios.tags.join(', '),
            token: token,
            decoded: decoded
        }
    });

});

module.exports = router;
