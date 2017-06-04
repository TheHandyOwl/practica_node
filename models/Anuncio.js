"use strict";

const mongoose = require ('mongoose');
const { models } = require('../config/config');

const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    venta: {
        type: Boolean,
        required: true,
        default: true
    },
    precio: {
        type: Number,
        required: true,
        default: 0.00
    },
    foto: String,
    tags: {
        type: [String],
        required: true,
        enum: models.anuncios.tags
    },
    created_at: Date,
    updated_at: Date
});

anuncioSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
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
