# Proyecto Incidentes de tránsito en Coronel Rosales

## Objetivo general

Desarrollar una aplicación web que permita visualizar, filtrar y representar gráficamente los incidentes viales del Partido de Coronel Rosales.

## Alcance

La idea a desarrollar se centra en la recolección y visualización de incidentes viales registrados en el Partido de Coronel Rosales, en base a fuentes periodísticas y registros locales. Los datos incluyen el tramo de la Ruta Nac. 3 que llega hasta el sector de El Triángulo”, por su importancia como nexo conectivo con la ciudad de Bahía Blanca.

## Origen de datos

Los datos de los incidentes viales se obtienen a partir de los incidentes viales informados por el sitio https://elrosalenio.com.ar/, el cual permite la reproducción de su contenido con la sola mención de la fuente.

## Limitaciones

No se incluyen análisis estadísticos avanzados ni predicciones de tendencias. Dichas tareas se consideran parte del trabajo de especialistas en cada campo, quienes podrán emplear esta herramienta como apoyo a su labor.

## Prototipo

El proyecto se presenta en la condición de "Prototipo", se lo desarrolló con Node.js y se emplea la librería json server para crear una API REST completa y simulada, utilizando un archivo JSON para simular una base de datos.

## Arquitectura y diseño

Se trata de un sitio web diseñado para ejecutarse como dos servicios paralelos, un backend y un frontend.

- El backend conforma una API que se relaciona con una base de datos, a fin de atender las solicitude del usuario del sitio.
- El frontend se encarga del renderizado de un mapa de la region del Partido de Coronel Rosales, con dos formatos para renderizar los datos, de presentar listas navegables de los incidentes y de facilitar el inicio de sesión al administrador del sitio, a fines de la carga y/o edición de los valores por incidente.
- Las imágenes serán almacenadas en el servidor, por haber sido editadas para mejor visualización.
- Las noticias serán accedidas desde el servidor del sitio de noticias.

## Entrega de prototipos

El Prototipo cumple con las siguientes condiciones:

- Frontend (Generación de un prototipo navegable, no funcional)
- Backend (Utilización de mocks locales o mockapi.io)
- Generación de documentación de los repositorios (README.md)
- Generación de tickets o tareas por integrante en un tablero (Ej: Jira)

## Criterios de evaluación

El Prototipo cumple con los siguientes criterios

- Manejo de repositorios para ambos prototipos.
- Configuración de servicios de deploy públicos del prototipo.
- Simulación de entorno local de ambos repositorios
- Colección en postman para pruebas contra la API
- Manejo de tableros en Jira para la división de tareas.
- Documentación del proyecto + Documentación de Repositorios (readme.md)
- Estandarización del código (linter: prettier)

## Créditos

Proyecto Final de la Tecnicatura en Desarrollo de SOftware en la Universidad Tecnológica Nacional, a cargo de:

- Jerónimo BALTIAN ORTIZ
- Jimena MARTINEZ ARANA
- Carlos Alberto ARCE
