"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

/* GET /apiv1/anuncios */
router.get('/', (req, res, next) => {


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
        res.json( { success: true, result: anuncios } );
    });
});

module.exports = router;