//Importar módulos necesarios
const path = require("path"); //Módulo para manipular rutas de archivos y directorios
const fs = require("fs"); // Módulo para interactuar con el sistema de archivos

//Función para verificar si una ruta existe
const verificarRuta = (ruta) => {
 return fs.existsSync(ruta); //Retorna true si la ruta existe, false si no 
};
//Función para convertir una ruta a su forma absoluta
const rutaAbsoluta = (ruta) => {
    if(!path.isAbsolute(ruta)) {
    return path.resolve(ruta); //Convertir la ruta relativa a absoluta
 } else {
    return ruta; //Si la ruta ya es absoluta, mantenerla igual
 }
};

//Función para obtener la extensión de la ruta (formato del archivo)
const extencionRuta = (ruta) => {
   return path.extname(ruta); //Retorna la extensión del archivo en la ruta
 };
 
 //Función para extraer enlaces desde el contenido de un archivo
 const extraerLinks = (ruta, contenido) => {
   const regExp = /\[(.*?)\]\((?!#)(.*?)\)/g; //Expresión regular para buscar enlaces
   let result;
   let links = [];
//Usar la expresión regular para encontrar todos los enlaces en el contenido   
   while ((result = regExp.exec(contenido)) !== null) {
//Crear un objeto con información del enlace y agregarlo al array    
     let objet = {
       href: result[(0, 2)], //result[2] contiene el enlace
       text: result[(0, 1)], //result [1] contiene el texto del enlace
       file: ruta, //Ruta del archivo donde se encontró el enlace
     };
     links.push(objet);
   }
   return links; //Retorna el array de enlaces extraídos
 };

 //Exportar las funciones para su uso en otros módulos
module.exports = {verificarRuta, rutaAbsoluta, extencionRuta, extraerLinks};