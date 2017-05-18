"use strict";

const mongoose = require ('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: String,
    precio: Number,
    foto: String,
    tags: [String],
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
