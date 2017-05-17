"use strict";

var crypto = require('crypto');

function hashIt(datos){
    return crypto.createHash('sha256').update(datos).digest('hex');
}
module.exports.hashIt = hashIt;
