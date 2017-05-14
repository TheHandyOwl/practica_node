# practica_node  

Desarrollar el software que se ejecutará en el servidor dando servicio a una app (API) de venta de artículos de segunda mano, llamada Nodepop.  

## Tabla de contenido  

* [Repositorio GitHub](#repositorio-github)  
* [Instalación](#instalacion)  
  * [Dependencias necesarias](#dependencias-necesarias)  
  * [Archivo www](#archivo-www)  
* [Desarrollo](#desarrollo)  
* [Rutas](#rutas)  
* [Changelog](#changelog)  

## Repositorio GitHub  

[https://github.com/TheHandyOwl/practica_node](https://github.com/TheHandyOwl/practica_node)  

## Instalación  

### Dependencias necesarias  

Las dependencias locales pueden consultarse en el archivo package.json.  
Para instalarlas desde el directorio raíz de la aplicación, ejecutando el siguiente comando:  
```
npm install
```

El script de inicio arranca nodemon  
```
  "scripts": {
    "start": "nodemon ./bin/www"
  },
```

## Desarrollo  

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

## Rutas  

| Ruta | Tipo | Archivo | Descripción |    
| ------------- | ------------- | ------------- | ------------- |  
| / | GET | ./ | |  
| / | POST | ./ | |  

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
