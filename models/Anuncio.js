"use strict";

const mongoose = require ('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: String,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function (filter, limit, skip, sort, fields, callback) {

    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
    query.exec(callback);

};

var Anuncio = mongoose.model( 'Anuncio', anuncioSchema );

module.exports = Anuncio;
