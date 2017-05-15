"use strict";

require('../connectMongoose');

var borrarColeccionesBBDD = ['Anuncio', 'Usuario'].map(function(collection) {
    return new Promise(function(resolve, reject) {
        try{
            let modelsPath = '../../models/';
            const dropCollection = require(modelsPath + collection);
            dropCollection.remove(function(err) {
                if (err) { return reject(err); }
                resolve(collection);
            });
        } catch (err) {
            reject(err);
        }
    });
});


function fileJSON (someData, fileName) {
    return new Promise( (resolve, reject) => {
        resolve(fileName);
    });
}

function readJSON (file) {
    const fs = require('fs');
    return new Promise( (resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject (err);
            resolve(data);
        });
    });
}

function parseJSON(data) {
    return new Promise ( ( resolve, reject ) => {
        try {
            resolve(JSON.parse(data));
        } catch (err) {
            reject(err);
        }
    });
}

function Anuncios2DB(data) {
    return new Promise ( ( resolve, reject ) => {
        
        const Anuncio = require('../../models/Anuncio');
        for ( let item in data.anuncios ) {
            const anuncio = new Anuncio(data.anuncios[item]);
            anuncio.save( (err, anuncioGuardado) => {
                if (err) {
                    reject(err);
                };
            });
        }
        console.log('Se han insertado', data.anuncios.length, 'item en la colección anuncios');
        resolve();
    });
}
function Usuarios2DB(data) {
    return new Promise ( ( resolve, reject ) => {
        
        const Usuario = require('../../models/Usuario');
        for ( let item in data.usuarios ) {
            const usuario = new Usuario(data.usuarios[item]);
            usuario.save( (err, usuarioGuardado) => {
                if (err) {
                    reject(err);
                };
            });
        }
        console.log('Se han insertado ', data.usuarios.length, 'item en la colección usuarios');
        resolve();
    });
}

Promise.all(borrarColeccionesBBDD)
    /*
    .then((data) => {
        console.log(data);
        return data;
    })
    */
    .then( (collectionArr) => { console.log('Colecciones borradas satisfactoriamente: ' + collectionArr); })
    .then(() => { 
        return fileJSON('', './lib/sample_data/anuncios.json');
        })
    .then(readJSON)
    .then( parseJSON )
    .then( Anuncios2DB )
    .then( () => {
        console.log('Ha finalizado la importación del archivo de anuncios');
    })
    .then(() => { 
        return fileJSON('', './lib/sample_data/usuarios.json');
        })
    .then(readJSON)
    .then( parseJSON )
    .then( Usuarios2DB )
    .then( () => {
        console.log('Ha finalizado la importación del archivo de usuarios');
    })
    .then( () => {
        console.log('FIN');
    })
    .catch( err => {
        console.log('ERROR', err);
    });
