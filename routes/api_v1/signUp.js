"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const customValidator = require('../../lib/customValidator');

//POST /api_v1/signUp {nombre: 'user', email: 'user@invalid.com', clave: 'password'}
router.post( '/', function (req, res, next) {

    if(!req.body.nombre){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca nombre de usuario para registrarse' } } );
        res.status(401);
        return;
    };
    if(!req.body.email){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca email de usuario para registrarse' } } );
        res.status(401);
        return;
    };
    if(!req.body.clave){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca clave de usuario para registrarse' } } );
        res.status(401);
        return;
    };
    if(!customValidator.comprobarEmail(req.body.email)){
        res.json( { success: false, result: { error: 401, mensaje: 'Introduzca un mail válido para registrarse' } } );
        res.status(401);
        return;
    };

    let usuario = {
        nombre: req.body.nombre,
        email: req.body.email,
        clave: req.body.clave
    };

    function buscarNombre (nombre) {
        return new Promise((resolve, reject) => {
            Usuario.findOne({ nombre : new RegExp( (nombre), 'ig' ) }).exec((err, usuario) => {
                if (err) {
                    res.json( { success: false, result: {error: err } } );
                    res.status(500);
                    reject;
                }
                if ( usuario === null ) {
                    resolve();
                }
                resolve(nombre);
            });
        });
    };
    function buscarEmail (email) {
        return new Promise((resolve, reject) => {
            Usuario.findOne({ email : new RegExp( (email), 'ig' ) }).exec((err, usuario) => {
                if (err) {
                    res.json( { success: false, result: {error: err } } );
                    res.status(500);
                    reject;
                }
                if ( usuario === null ) {
                    resolve();
                }
                resolve(email);
            });
        });
    };
    function aceptarAlta(usuario, datos) {
        return new Promise ( ( resolve, reject ) => {
            datos = datos.filter(Boolean);
            if( datos.length !== 0 ) {
                res.json( { success: false, result: { error: 'Alta rechazada', mensaje: 'Coindidencias encontradas: ', datos } } );
                res.status(401);
                resolve();
                return;
            }
            let usuarioAlta = new Usuario(usuario);
            usuarioAlta.save( (err, usuarioGuardado) => {
                if (err) {
                    res.json( { success: false, result: { error: err, mensaje: 'Errores de validación en el alta de usuario: ', usuario } } );
                    res.status(401);
                    resolve();
                    return;
                };
                res.json( { success: true, result: { mensaje: 'Se ha dado de alta al usuario: ', usuario } } );
                resolve();
                return;
            });
        });
    }

    Promise.all([buscarNombre(req.body.nombre), buscarEmail(req.body.email)])
    .then( (rechazarAlta) => {
        return aceptarAlta(usuario, rechazarAlta);
    })
    .catch( (err) => {
        res.json( { success: false, result: {error: err } } );
        res.status(500);
    } );

});

module.exports = router;
