"use strict";

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

/* GET /apiv1/anuncios */
router.get('/', (req, res, next) => {
    //res.json( { success: true } );

    Anuncio.find().exec( ( err, anuncios ) => {
        if (err) {
            next(err);
        }
        res.json( { success: true, result: anuncios } );
    });
});

module.exports = router;