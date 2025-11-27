# API de incidentes de tránsito en Coronel Rosales

## API REST Mock

Este backend implementa una API REST mock utilizando Node.js y la librería JSON Server.
La API simula una base de datos mediante un archivo db.json y expone endpoints para consultar, crear, modificar y eliminar incidentes viales registrados en el Partido de Coronel Rosales. Su objetivo es servir como backend temporal para el desarrollo del frontend y futuras integraciones.

## Tecnologías utilizadas

- Node.js
- JSON Server
- Nodemon (para recarga automática, si corresponde)
- npm scripts

## Instalación e inicio

- Clonar el repositorio del backend (o descargar el código fuente)
- git clone https://github.com/j3r0nimo/MapaIncidentes.git
- cd backend
- npm install
- npm run mock
- La API estará disponible en http://localhost:3001

## Colección en postman

Se incluye una colección lista para importar en Postman.  
Permite probar todos los endpoints del backend mock.

**Descargar colección:**  
`postman/Incidentes.postman_collection.json`

Para importarla en Postman:  
_File → Import → Collection → Seleccionar archivo JSON._
