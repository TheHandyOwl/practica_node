"use strict";

const mongoose = require ('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: String,
    precio: Number,
    foto: String,
    tags: [String]
});

var Anuncio = mongoose.model( 'Anuncio', anuncioSchema );

module.exports = Anuncio;
