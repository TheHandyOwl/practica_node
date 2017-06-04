# practica_node  

Desarrollar el software que se ejecutará en el servidor dando servicio a una app (API) de venta de artículos de segunda mano, llamada Nodepop.  


## Tabla de contenido  

* [Repositorio GitHub](#repositorio-github)  
* [Ejemplo AWS](#ejemplo-aws)  
* [Instalacion](#instalacion)  
  * [Dependencias necesarias](#dependencias-necesarias)  
  * [Archivo www](#archivo-www)  
* [MongoDB](#mongodb)  
* [Desarrollo](#desarrollo)  
* [Rutas](#rutas)  
* [Changelog](#changelog)  


## Repositorio GitHub  

[https://github.com/TheHandyOwl/nodepop](https://github.com/TheHandyOwl/nodepop)  


## Ejemplo AWS  

### Página inicial con css servido como archivo estático  
[https://nodepop.thehandyowl.com/](https://nodepop.thehandyowl.com/)  

### Imágenes estáticas servidas por nginx  
[https://nodepop.thehandyowl.com/images/bici.jpg](https://nodepop.thehandyowl.com/images/bici.jpg)  
[https://nodepop.thehandyowl.com/images/iphone.png](https://nodepop.thehandyowl.com/images/iphone.png)  


## Instalacion  

### Dependencias necesarias  

Las dependencias locales pueden consultarse en el archivo package.json.  
Para instalarlas desde el directorio raíz de la aplicación, ejecutando el siguiente comando:  
```
npm install
```

O también dejando desde npm
```
npm run setup
```

El script de inicio arranca node  
```
  "scripts": {
    "start": "node ./bin/www",
    "setup": "npm install"
  },
  },
```


## MongoDB  

Revisar el archivo config.js.example y crear el archivo config.js con los datos personalizados  
Por defecto la cadena de conexión a la BBDD no incluye usuario ni contraseña  
NOTA: Para que se valide usuario y contraseña cambiar a config.db.db_auth = 'db_with_auth';  
```
if (db.db_auth == 'db_without_auth') {
    server_string_connection = db.db_without_auth.server_string_connection;
} else if (db.db_auth == 'db_with_auth') {
    server_string_connection = db.db_with_auth.server_string_connection;
} else {
    console.log('Elige un tipo de validación para conectar a la BBDD');
    exit (1);
}
```


## Desarrollo  

### Archivo www  

Cambiamos el debug por un console.log() para visualizar la información por consola  
```
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  //debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}
```

Se han añadido datos de prueba.
ADVERTENCIA: LAS COLECCIONES EXISTENTES SERAN ELIMINADAS

La carga de datos se inicia con:  
```
npm run sample
```

El script de inicio arranca node  
```
  "scripts": {
    "start": "node ./bin/www",
    "setup": "npm install",
    "sample": "node ./lib/sample_data/install_db"
  },
```  


## Rutas  

| Archivo | Tipo | Ruta | Descripción |    
| ------------- | ------------- | ------------- | ------------- |  
| /index | GET | / | No se usa por el momento |  
| /api_v1/anuncios | GET | / | Muestra todos los anuncios. Tiene filtros (acepta querys)|  
| /api_v1/anuncios | GET | /:id | Muestra 1 anuncio en concreto |  
| /api_v1/singIn | POST | / | Valida el acceso con email y clave |  
| /api_v1/singUp | POST | / | Registra u1 usuario nuevo con nombre, email(válido) y clave |  
| /api_v1/tags | GET | / | Muestra el listado de tags |  
| /api_v1/usuarios | GET | /:nombre | Pasando el usuario, muestra su información pública o privada |  


## Changelog  

- Versión v.0.0.0  
    - Proyecto base   
  
- Versión v.2.0.0  
    - Aplicación generada  
    - Servidor configurado y funcionando  
  
- Versión v.2.0.1  
    - Quitando la barra / de los directorios configurados en .gitignore  

- Versión v.2.0.2  
    - Borrar carpeta node_modules del remoto    

- Versión v.2.1.0  
    - Añadimos funcionalidad de clustering    

- Versión v.3.0.0  
    - Añadimos mongoose  
    - Añadimos datos de prueba      

- Versión v.3.0.1  
    - Cambiamos script de inicio setup a installDB  

- Versión v.3.1.0  
    - Creamos la ruta para anuncios
    - Creamos filtros en anuncios  

- Versión v.3.2.0  
    - Creamos la ruta para 1 anuncio en concreto, pasado como parámetro  
    
- Versión v.3.3.0  
    - Creamos la ruta para validar usuarios  
    - Hash de contraseña al guardar el usuario  
    - Hash de contraseña al validar el usuario  
    - Se prueba la carga masiva, y las contraseñas se cifran    

- Versión v.4.0.0  
    - Separamos las rutas de usuarios  
    - Ruta usuarios para validar el inicio de sesión, llamado signIn  
    - Ruta usuarios genérica que no muestra nada por el momento, y ruta modificada con parámetro :nombre para facilitar información parcial de un usuario  
    - Modelo de datos de usuario acepta parámetro de idioma (lang). 
    - Datos de carga modificados con idioma  
    - hash para contraseñas. 
    - Firma para generar tokens. 
    - Comprobación de un token. 

- Versión v.4.1.0  
    - Creamos ruta para registrar usuarios  
    - Se corrige el ejemplo de la ruta para validar usuarios  
    - Se corrigen los campos por los que se valida el usuario  
    - Se crea un índice en la BBDD para consultar por email
    - Se documentan las primeras rutas en el fichero README.md  

- Versión v.4.1.1  
    - Protegemos las rutas de anuncios con token
    - Ponemos estados a las respuestas de la ruta de usuarios  

- Versión v.4.2.0  
    - Añadimos ruta para visualizar los tags  
    - Documentamos la nueva ruta en README.md  

- Versión v.4.2.1  
    - Guardamos email en minúscula para optimizar búsquedas en la BBDD
    - Añadimos buscadas mejoradas que no son 'case sensitive' para buscar mail o nombre  

- Versión v.4.2.2  
    - Revisión final
    - Queda pendiente la internacionalización  

- Versión v.4.2.3  
    - Se muestran las fotos en ruta estática  
    
- Versión v.4.3.0  
    - Añadimos autenticación a la cadena de conexión a MongoDB desde conectionMongoose  
    - Se mantiene el valor de la BBDD por defecto, pero se anonimiza el usuario y la password  
    - Se deberá modificar el usuario que escribe en la BBDD y su password  

- Versión v.5.0.0  
    - Sacamos e ignoramos la configuración en el fichero config/config.js  
    - Pasamos al archivo config todos los archivos de configuración  
    - Cambiamos la forma de conectarse a la BBDD. Ahora permite conexión sin autenticación o autenticación con usuario y contraseña
    - Por defecto se deja la BBDD sin autenticar
    - Dejamos ejemplo de configuración de variables en config/config.js.example  
    - Cambiamos la clave de los tokens  
    - Añadimos enlace a AWS para corregir la práctica en vivo  
