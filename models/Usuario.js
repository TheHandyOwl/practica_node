"use strict";

const mongoose = require('mongoose');
const authenticate = require('../lib/authenticate');
const customValidator = require('../lib/customValidator');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    clave:  {
        type: String,
        required: true
    },
    lang: {
        type: String,
        default: 'en'
    },
    created_at: Date,
    updated_at: Date
});

usuarioSchema.pre('save', function(next) {
    this.email = this.email.toLowerCase();
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    if (this.clave) {
        this.clave = authenticate.hashIt(this.clave);
    }
    next();
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

Usuario.schema.path('email').validate(function (email) {
  return customValidator.comprobarEmail(email);
}, 'Email no válido');
Usuario.schema.path('clave').validate(function (clave) {
  return clave.length >= 6;
}, 'El password deberia de ser mas largo');


module.exports = Usuario;
