"use strict";

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const config = require('../config/jwtConfig');

function hashIt(datos){
    return crypto.createHash('sha256').update(datos).digest('hex');
}
function signIt(id) {
    return jwt.sign({id: id}, config.jwt.secret, {expiresIn: config.jwt.expiresInMinutes * 60});
}

function validateIt( token ){

    let decoded;
    let message;

    try{
        let payload = jwt.verify(token, config.jwt.secret);
        message = ({ success: true, result: { mensaje: 'Validado el token', token: token, payload: payload }});
    } catch (err) {
        message= ({ success: false, result: { error: 403, mensaje: 'El token no es válido o ha expirado.'}});
    } finally {
        return message;
    }

}

module.exports.hashIt = hashIt;
module.exports.signIt = signIt;
module.exports.validateIt = validateIt;
