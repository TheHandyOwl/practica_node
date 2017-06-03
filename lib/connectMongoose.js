"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on( 'error', err => {
    console.log('Error de conexión a la BBDD', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Se ha conectado a la BBDD');
});

const server_name = 'localhost';
const server_db = 'nodepop';
const server_user = 'server_user';
const server_password = 'server_password';

const server_string_connection = 'mongodb://' + 
    server_user + ':' +
    server_password + '@' +
    server_name + 
    '/' + 
    server_db;

mongoose.connect(server_string_connection);
