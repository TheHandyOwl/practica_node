"use strict";

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const { tokens } = require('../config/config');

function hashIt(datos){
    return crypto.createHash('sha256').update(datos).digest('hex');
}

function signIt(id) {
    return jwt.sign({id: id}, tokens.jwt.secret, {expiresIn: tokens.jwt.expiresInMinutes * 60});
}

function validateIt( token ){

    try{
        return jwt.verify(token, tokens.jwt.secret);
    } catch (err) {
        return err;
    }

}

module.exports.hashIt = hashIt;
module.exports.signIt = signIt;
module.exports.validateIt = validateIt;
