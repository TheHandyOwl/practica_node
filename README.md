# practica_node  

Desarrollar el software que se ejecutará en el servidor dando servicio a una app (API) de venta de artículos de segunda mano, llamada Nodepop.  

## Tabla de contenido  

[Repositorio GitHub](#repo)  
[Instalación](#install)  
[Desarrollo](#dev)  
[Rutas](#router)  
[Changelog](#changelog)  

## Repositorio GitHub {#repo}  

[https://github.com/TheHandyOwl/practica_node](https://github.com/TheHandyOwl/practica_node)  

## Instalación {#install}  

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

El script de inicio arranca nodemon  
```
  "scripts": {
    "start": "nodemon ./bin/www",
    "setup": "npm install"
  },
```

## Desarrollo {#dev}  
### Archivo ./bin/www  
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

El script de inicio arranca nodemon  
```
  "scripts": {
    "start": "nodemon ./bin/www",
    "setup": "npm install",
    "sample": "node ./lib/sample_data/install_db"
  },
```
## Rutas {#router}  

| Ruta | Tipo | Archivo | Descripción |    
| ------------- | ------------- | ------------- | ------------- |  
| / | GET | ./ | |  
| / | POST | ./ | |  

## Changelog {#changelog}  
- Versión v.1.0.0  
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
