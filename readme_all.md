# Proyecto Incidentes de tránsito en Coronel Rosales

## Objetivo general

Desarrollar una aplicación web que permita visualizar, filtrar y representar gráficamente los incidentes viales del Partido de Coronel Rosales.

## Alcance

El proyecto se enfoca en la recolección y visualización de incidentes viales registrados en el Partido de Coronel Rosales, en base a fuentes periodísticas y registros locales. Los datos incluyen el tramo de la Ruta Nac. 3 que llega hasta el sector de El Triángulo”, por su relevancia como corredor de conexión con la ciudad de Bahía Blanca.

## Origen de datos

Los datos de los incidentes viales se obtienen a partir de los incidentes viales informados por el sitio https://elrosalenio.com.ar/, el cual autoriza la reproducción de su contenido con la sola mención de la fuente.

## Limitaciones

El proyecto no realiza análisis estadísticos avanzados, modelos predictivos ni estudios de tendencias. Estas tareas se consideran propias de especialistas, quienes podrán utilizar esta herramienta como apoyo visual y documental.

## Prototipo

El proyecto se presenta en la condición de "Prototipo", se lo desarrolló con Node.js y se emplea la librería json server para crear una API REST completa y simulada, utilizando un archivo JSON como base de datos mock.

## Arquitectura y diseño

El proyecto se estructura en dos servicios principales: backend y frontend, ejecutados en paralelo.

### Backend

- Implementa una API REST que interactúa con una base de datos (real o simulada).
- Maneja las operaciones de lectura, alta, modificación y eliminación de incidentes.
- Gestiona la autenticación del administrador del sitio.

### Frontend

- Renderiza un mapa interactivo del Partido de Coronel Rosales.
- Permite visualizar los incidentes tanto en formato geográfico como en listas navegables.
- Incluye una interfaz de inicio de sesión para el administrador, necesaria para cargar o editar datos.

### Manejo de archivos e información

- Las imágenes asociadas a los incidentes se almacenan en el servidor, previamente optimizadas para mejorar su visualización.
- Las noticias originales se consultan directamente desde el sitio de origen.

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

Universidad Tecnológica Nacional, Proyecto Final de la Tecnicatura Universitaria en Programación, a cargo de:

- Jerónimo BALTIAN ORTIZ
- Jimena MARTINEZ ARANA
- Carlos Alberto ARCE
