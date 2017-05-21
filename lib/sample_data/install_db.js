"use strict";

// Si la BBDD no está iniciada, se genera un error y se detiene
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
    console.log('Iniciando importación de anuncios');
    return new Promise ( ( resolve, reject ) => {
        const Anuncio = require('../../models/Anuncio');

        // PROMISE NO SE DETIENE CON ERROR
        // INSERTA 1 A 1 SALTANDO LOS QUE FALLAN
        // NUNCA ENTRARA EN PROMISE.CATCH
        /*
        let itemsInsertados = 0;
        for ( let item in data.anuncios ) {
            const anuncio = new Anuncio(data.anuncios[item]);
            anuncio.save( (err, anuncioGuardado) => {
                itemsInsertados ++;
                if (err) {
                    console.log('Anuncios: Error: item ', itemsInsertados, '/', data.anuncios.length, 'de la colección anuncios', ' --> ', err.errors);
                };
                if(anuncioGuardado){
                    console.log('Anuncios: Ok   : item ', itemsInsertados, '/', data.anuncios.length, 'de la colección anuncios');
                }
            });
        }
        resolve();
        */

        // PROMISE SE DETIENE CON ERROR
        // SOLO MUESTRA EL PRIMER FALLO
        /**/
            var arr = [];
            for(var i = 0; i < data.anuncios.length; i++){
                arr.push(data.anuncios[i]);
            }

            Anuncio.insertMany(arr, (err, resultados) => {
                if(err){
                    console.log('Error insertando anuncios. Proceso detenido.');
                    reject(err);
                    return;
                }
                if(resultados) {
                    console.log('Anuncios insertados correctamente' );
                    resolve();
                    return;
                }
            });
        /**/

    });
}
function Usuarios2DB(data) {

    console.log('Iniciando importación de usuarios');
    return new Promise ( ( resolve, reject ) => {
        const Usuario = require('../../models/Usuario');

        // PROMISE NO SE DETIENE CON ERROR
        // INSERTA 1 A 1 SALTANDO LOS QUE FALLAN
        // NUNCA ENTRARA EN PROMISE.CATCH
        /*
        let itemsInsertados = 0;
        for ( let item in data.usuarios ) {
            const usuario = new Usuario(data.usuarios[item]);
            usuario.save( (err, usuarioGuardado) => {
                itemsInsertados ++;
                if (err) {
                    console.log('Usuarios: Error: item ', itemsInsertados, '/', data.usuarios.length, 'de la colección usuarios', ' --> ', err.errors);
                };
                if(usuarioGuardado){
                    console.log('Usuarios: Ok   : item ', itemsInsertados, '/', data.usuarios.length, 'de la colección usuarios');
                }
            });
        }
        resolve();
        */

        // PROMISE SE DETIENE CON ERROR
        // SOLO MUESTRA EL PRIMER FALLO
        /**/
        var arr = [];
        for(var i = 0; i < data.usuarios.length; i++){
            arr.push(data.usuarios[i]);
        }

        Usuario.insertMany(arr, (err, resultados) => {
            if(err){
                    console.log('Error insertando usuarios. Proceso detenido.');
                    reject(err);
                    return;
            }
            if(resultados) {
                console.log('Usuarios insertados correctamente' );
                resolve();
                return;
            }
        });
        /**/

    });

}

Promise.all(borrarColeccionesBBDD)
    /*
    .then((data) => {
        console.log(data);
        return data;
    })
    */
    .then( (collectionArr) => { console.log('***** Colecciones borradas satisfactoriamente: ' + collectionArr); })
    .then( () => { console.log('**************************************************'); })
    .then( () => { console.log(''); })
    .then( () => { console.log('***** Proceso de importación de datos'); })
    .then( () => { console.log('***** Se detendrá la secuencia si se obtiene algún error'); })
    .then( () => { console.log('***** La alternativa (que está comentada) es ir 1 a 1, insertando sólo los buenos'); })
    .then( () => { console.log('**************************************************'); })
    .then( () => { console.log(''); })
    .then( () => { console.log('***** Iniciando proceso ...'); })
    .then( () => { console.log('**************************************************'); })
    .then(() => { 
        return fileJSON('', './lib/sample_data/anuncios.json');
        })
    .then( readJSON )
    .then( parseJSON )
    .then( Anuncios2DB )
    .then(() => { 
        return fileJSON('', './lib/sample_data/usuarios.json');
        })
    .then( readJSON )
    .then( parseJSON )
    .then( Usuarios2DB )
    .catch( err => {
        console.log('ERROR:', '\n', err);
        return;
    });

