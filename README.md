# SAU_Prototipo
Propuesta Inicial de Prototipo SAU - CITE FLACSO

Este es un proyecto realizado en colaboración con CITE-FLACSO para la propuesta de indicadores para el análisis urbano en Ecuador junto con la creación de un prototipo de una aplicación para un observatorio urbano nacional.

El prototipo del observatorio relacionado con éste código está funcionando en http://sau.polluxdata.com

En este repositorio se encuentra el código javascript utilizado en el frontal.

Para que el código sea funcional se debe instalar un servidor Linux con:
Servidor de Mapas, Geoserver versión 2.9 estable.
Servidor Postgres 9.4 con extensión Postgis 2.1.14.

Cargar la tabla con los datos de circuitos para Guayaquil, Ambato y Orellana.
Crear la vista con los puntos medios de la tabla.
Publica en el Geoserver las capas para que sean procesadas por el javascript.

Para cualquier pregunta técnica escribir a fjandrade@polluxdata.com
