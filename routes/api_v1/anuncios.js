"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');
const authenticate = require('../../lib/authenticate');

/* GET /apiv1/anuncios */
router.get('/', (req, res, next) => {

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

    const id = req.query.id;
    const nombre = req.query.nombre;
    const tags = req.query.tags;
    const venta = req.query.venta || null;
    const precio_min = parseInt(req.query.precio_min);
    const precio_max = parseInt(req.query.precio_max);
    const limit = parseInt(req.query.limit) || null;
    const skip = parseInt(req.query.skip) || null;
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};
    const filter_temp = {};
    if (id) {
        filter.id = id;
    }
    if (nombre) {
        filter.nombre = new RegExp( (nombre), 'ig' );
    }
    if (tags) {
        filter.tags = tags;
    }
    if (venta) {
        filter.venta = venta;
    }
    if ( typeof precio_min !== 'undefined' && precio_min % 1 === 0 ) {
        filter_temp.precio_min = precio_min;
    }
    if ( typeof precio_max !== 'undefined' && precio_max % 1 === 0 ) {
        filter_temp.precio_max = precio_max;
    }
    if ( filter_temp.precio_min && filter_temp.precio_max ) {
        filter.precio = { '$gte': filter_temp.precio_min, '$lte': filter_temp.precio_max };
    } else if ( filter_temp.precio_min ) {
        filter.precio = { '$gte': filter_temp.precio_min };
    } else if ( filter_temp.precio_max ) {
        filter.precio = { '$lte': filter_temp.precio_max };
    }

    Anuncio.list( filter, limit, skip, sort, fields, ( err, anuncios ) => {
        if (err) {
            next(err);
            return;
        }
        if (anuncios.length === 0){
            res.json( { success: true, result: 'No hay anuncios disponibles' } );
            return;
        }
        res.json( { success: true, result: anuncios } );
    });
});

/* GET /apiv1/anuncios/:id */
router.get('/:id', (req, res, next) => {

console.log(req.params);
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
    if(!req.params.id || req.params.id.length !== 24){
        console.log('Falta algo');
        res.json( { success: false, result: { error: 404, mensaje: 'El anuncio ' + req.params.nombre +'-' + req.params.id + 'no existe'} } );
        res.status(404);
        return;
    }

    Anuncio.findOne({ _id : req.params.id }).exec((err, anuncio) => {
        if (err) {
            next(err);
            return;
        }
        console.log('Anuncio: ',anuncio);
        if (!anuncio || anuncio.length === 0){
            res.json( { success: true, result: 'El anuncio ' + req.params.id + 'no existe' } );
            res.status(404);
            return;
        }
        res.json( { success: true, result: anuncio } );
    });
});

module.exports = router;