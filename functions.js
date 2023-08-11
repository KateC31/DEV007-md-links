const path = require("path");
const fs = require("fs");

const verificarRuta = (ruta) => {
 return fs.existsSync(ruta);
};
const rutaAbsoluta = (ruta) => {
    if(!path.isAbsolute(ruta)){
    return path.resolve(ruta)
 } else {
    return ruta;
 }
};

const extencionRuta = (ruta) => {
   return path.extname(ruta);
 };
 
 const extraerLinks = (ruta, contenido) => {
   const regExp = /\[(.*?)\]\((?!#)(.*?)\)/g;
   let result;
   let links = [];
   while ((result = regExp.exec(contenido)) !== null) {
     let objet = {
       href: result[(0, 2)],
       text: result[(0, 1)],
       file: ruta,
     };
     links.push(objet);
   }
   return links;
 };

module.exports = {verificarRuta, rutaAbsoluta, extencionRuta, extraerLinks};