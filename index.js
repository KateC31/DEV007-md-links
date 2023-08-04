const path = require("path");
const fs = require("fs");

const mdLinks = (pathArgv, options) => {
  const relativePath = process.argv[2];
  const validateOption = process.argv.includes("--validate") || process.argv.includes("--v");
 //const validateOption = process.argv.includes("--validate");

 let userPath;
  // VERIFICAR SI LA RUTA ExiSTE O NO //
  if (fs.existsSync(relativePath)) {
    // console.log("La ruta SI existe");
  } else {
  console.log("NO se encontró una ruta");
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
 if (validateOption) {
//Desde acá empieza la validación
let arrayDePromesas = [];
links.forEach((links) => {
  arrayDePromesas.push(fetch(links.href));
});
return Promise.all(arrayDePromesas).then((responses) => {
const results = responses.map((response, index) => {
const link = links[index];
return {
href: link.href,
text: link.text,
file: link.file,
status: response.status,
ok: response.ok ? "ok" : "fail",
};
});
console.log(results);
})
.catch((error) => {
  console.error("Error al realizar las peticiones HTTP:",error);
  return[];
});
 } else {
  console.log(links);
 }
} else {
  console.log("No se puede leer, no es archivo MD");
}
};

mdLinks();

module.exports = {
  mdLinks,
};
