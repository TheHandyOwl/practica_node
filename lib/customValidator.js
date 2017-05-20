"use strict";

const validator = require('validator');

exports.comprobarEmail = function (email) {
    return validator.isEmail(email);
};
