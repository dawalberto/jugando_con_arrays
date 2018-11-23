# [JUGANDO CON ARRAYS](https://dawalberto.github.io/jugando_con_arrays/arrays.html)



### ¿EN QUÉ CONSISTE Y A QUIÉN VA DIRIGIDA?
Jugando con arrays es una aplicación web que va dirigida a programadores con cualquier experiencia, ya sean juniors, semis o seniors.
Consiste en una interfaz gráfica a través de la cual podemos crear, modificar y eliminar matrices de manera gráfica.



### OBJETIVO
El objetivo de la aplicación web es que podamos manejar matrices y observar como se comportan sin escribir una línea de código. Es por esto que va dirigida a cualquier perfil de programador, por ejemplo a un junior le puede venir bien para observar como se comportan las matrices y como se alteran dependiendo de que método seleccione a modo de aprendizaje, mientras que a un senior le puede venir bien por ejemplo para realizar una prueba rápida y ver el resultado sin necesidad de ponerse a escribir el código a mano.



### ¿CÓMO SE USA?
Jugando con arrays nos permite:
* CREAR MATRICES
    * Escribiendo el nombre de la matriz y los elementos deseados separados por comas en los campos de texto adecuados y haciendo clic en el botón AÑADIR.
* MODIFICAR MATRICES
    * Seleccionando la matriz y el método deseado en las lista desplegables y haciendo clic en el botón MUTAR.
* ELIMINAR MATRICES
    * Seleccionando la matriz deseada en la lista desplegable y haciendo clic en el botón ELIMINAR.
* OBTENER AYUDA DE UN MÉTODO
    * Haciendo clic sobre la etiqueta MÉTODO de color azul, habiendo seleccionado previamente el método en cuestión.



### ¿CÓMO FUNCIONA?
La mayor parte de la funcionalidad de la aplicación web recae sobre el objeto Arrays,en el cual tenemos todas las matrices que se van generando durante el uso de la aplicación.

Cuando un usuario añade una matriz lo que pasa en el programa es que se añaden el nombre de la matriz, sus elementos y su longitud en las propiedades noms, arrs y lengths del objeto Arrays. Como dichas propiedades son matrices, después de que el usuario haya introducido varias matrices y queramos trabajar con una de ellas, para referirnos por ejemplo a la primera matriz que introdujo el usuario necesitaríamos recoger el nombre de la matriz(Arrays.noms[0]), los elementos de la matriz(Arrays.arrs[0]), y la longitud de la matriz(Arrays.lengths[0]).

Cuando un usuario elimina una matriz primero se localiza la posición que hace referencia a todas las propiedades de la matriz seleccionada, como por ejemplo el nombre de la matriz(Arrays.noms[3]), los elementos de la matriz(Arrays.arrs[3]), y la longitud de la matriz(Arrays.lengths[3]). Una vez sabemos la posición que hace referencia a la matriz seleccionada por el usuario(en este caso la 3), como las propiedades del objeto Arrays son matrices, basta con eliminar dicha posición.
Cuando un usuario ejecuta un método se ejecuta la función metodoArr(), la cual está formada principalmente por una estructura switch case en la que cada case es un método de los que puede seleccionar el usuario, una vez dentro del case adecuado se recupera la matriz seleccionada por el usuario de la misma manera en la que se explica arriba para poder trabajar con ella y se ejecuta el código correspondiente al método seleccionado por el usuario. 



### ESTRUCTURA DE FICHEROS
En la carpeta del proyecto podemos encontrar los siguientes ficheros y directorios:

* arrays.html es la página principal y contiene la interfaz de la aplicación web.
* methods.html es la página que contiene las ayudas y ejemplos de cada método.
* arrays.js es el fichero que contiene todo el código JavaScript de la aplicación web, a excepción de dos funciones que se encuentran dentro del archivo methods.html.
* estilosToYourCode.css contiene el código css que da color al código de los ejemplos y de la ventana donde se va representando el código JavaScript, este archivo css se usa exclusivamente para este propósito, las demás modificaciones con respecto al css las realizo dentro del propio fichero html.
* javascript.png es el icono que uso para la pestaña del navegador.
* Memoria.pdf 
* README.md



### DETALLES, LIMITACIONES Y OTROS DATOS DEL PROYECTO

* Casi todo el estilo de la aplicación está realizado con Bootstrap.
* Al obtener los elementos que el usuario quiere en la matriz desde un input obtengo una cadena de tipo string en lugar de una matriz de elementos, esto me obliga a separar la cadena por comas para poder obtener cada elemento que el usuario ha introducido y así crear una matriz de verdad. Debido a esto la aplicación web no permite que un elemento tenga una o varias comas en medio, de ser así pasaría a ser más de un elemento.
* El punto anterior está explicado en una pequeña ventana emergente llamada popover que se muestra al hacer clic en el botón que se encuentra al lado del input de la longitud de la matriz. Este popover es lo único que utiliza jquery en el proyecto, todo lo demás es JavaScript.
* Una de las cosas que quería hacer, y he hecho en la página web es que cualquier usuario pudiese “toquetear” el programa sin tener ni idea de programación. Para esto me pareció muy importante que el usuario pudiese introducir los elementos sin tener que escribirlos entre comillas. A mi parecer una persona cualquiera no tiene porque saber que los datos de tipo string que queramos introducir en una matriz deben ir entre comillas para no ser confundidos con variables sin declarar que provocarán un error. A causa de esto la aplicación web quedó limitada a interpretar siempre los datos de tipo numéricos únicamente como numéricos, es decir, un usuario nunca podrá introducir un “2” de tipo string, siempre será un 2 de tipo number.


### AUTOR
Alberto García Sola