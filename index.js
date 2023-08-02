const path = require("path");
const fs = require("fs");

const mdLinks = (pathArgv, options) => {
  const relativePath = process.argv[2];
 //const validateOption = process.argv.includes("--validate");

 let userPath;
  // VERIFICAR SI LA RUTA ExiSTE O NO //
  if (fs.existsSync(relativePath)) {
    // console.log("La ruta SI existe");
  } else {
  //console.log("NO se encontró una ruta");
  }
//verificar si la ruta es absoluta o es relativa
  if (path.isAbsolute(relativePath) === false) {
  // si la ruta no es absoluta hay que convertirla a absoluta
  //convertir la ruta a absolta
  userPath = path.resolve(relativePath);
  //console.log(userPath);
  } else {
     userPath = relativePath;
  }
//Para saber la extensión de un archivo(Si es MD o no)
  if (path.extname(userPath) === ".md") {
//console.log("El archivo es un MD");

//Para leer un archivo
const texto = fs.readFileSync(userPath, "utf-8");
//console.log(texto);
const regExp = /\[(.*?)\]\((?!#)(.*?)\)/g;
let result;
let links = [];
while ((result = regExp.exec(texto)) !== null) {
  let objet = {
    href: result[(0, 2)],
    text: result[(0, 1)],
    file: userPath,
  };
  links.push(objet);
  }
 if (!options) {
//Desde acá empieza la validación
let arrayDePromesas = [];
links.forEach((links) => {
  arrayDePromesas.push(fetch(links.href));
})
Promise.all(arrayDePromesas).then((data) => {
const codes = data.map((Response) => Response.status);
  console.log(codes);
  //console.log(arrayDePromesas);
});

} else {
  console.log(links);
}
} else {
console.log("No lo puedo leer, no es archivo MD");
}
  }
mdLinks();

module.exports = {
  mdLinks,
}
