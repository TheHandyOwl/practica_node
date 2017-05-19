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

    try{
        return jwt.verify(token, config.jwt.secret);
    } catch (err) {
        return err;
    }

}

module.exports.hashIt = hashIt;
module.exports.signIt = signIt;
module.exports.validateIt = validateIt;
