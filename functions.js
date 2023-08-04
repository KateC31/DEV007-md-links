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

module.exports = {verificarRuta, rutaAbsoluta};