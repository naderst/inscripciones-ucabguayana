Sistema de inscripción académica de la UCAB Guayana
====================================================

## Crear módulos

Para crear módulos se debe crear una subcarpeta en la carpeta /modulos con el nombre del modulo en minúscula con las palabras separadas por underscore \(\_\), dentro de esta carpeta deben estár las diferentes vistas del modulo, que son archivos con extensión php \(Ej: modulos/mod\_prueba/index\.php\) para acceder al módulo se utilizaría la URL de la siguiente manera: http://www\.ejemplo\.com/mod\-prueba note que los guiones \(\-\) son sustituidos por underscore \(\_\) si queremos acceder a otra vista de este modulo, sería de esta manera: http://www\.ejemplo\.com/mod\-prueba/vista

## Parámetros GET

Para pasar parámetros por GET no será como se suele hacer \(Ej: index\.php?param=val&param2=val2\) en este caso lo haremos de esta manera:

http://www\.ejemplo\.com/mod\-prueba/index/val/val2

luego en nuestra vista para acceder a estos parámetros tenemos un arreglo $app['params'] donde sus elementos son los parámetros en el orden en que se pasaron\.

## Referencias a otros archivos

Para hacer referencias a otros archivos debemos utilizar únicamente rutas absolutas \(Ej: /css/estilo\.css\)

NO se debe acceder con rutas relativas \(Ej: css/estilo\.css\)
