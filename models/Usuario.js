"use strict";

const mongoose = require('mongoose');
const authenticate = require('../lib/authenticate');

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
    lang: String,
    created_at: Date,
    updated_at: Date
});

usuarioSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    if (this.clave) {
        this.clave = authenticate.hashIt(this.clave);
    }
    this.lang = lang || 'en';
    next();
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
