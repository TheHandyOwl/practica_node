"use strict";

const validator = require('validator');

exports.comprobarEmail = function (email) {
    console.log(email);
    return validator.isEmail(email);
};
