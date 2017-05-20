"use strict";

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario');
const customValidator = require('../../lib/customValidator');

//POST /api_v1/signUp {nombre: 'James', email: 'emailJames@invalid.com', clave: 'passwordJames'}
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
            Usuario.findOne({ nombre : nombre }).exec((err, usuario) => {
                if (err) {
                    res.json( { success: false, result: {error: err } } );
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
            Usuario.findOne({ email : email }).exec((err, usuario) => {
                if (err) {
                    res.json( { success: false, result: {error: err } } );
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
                resolve();
                return;
            }
            let usuarioAlta = new Usuario(usuario);
            usuarioAlta.save( (err, usuarioGuardado) => {
                if (err) {
                    reject(err);
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
        res.json( { success: false, result: { error: err, mensaje: 'Se ha produciso un error al registrar el usuario: ', usuario } } );
    } );

});

module.exports = router;
