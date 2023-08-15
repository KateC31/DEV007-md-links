//Importar los módulos necesarios de Node.js
const path = require("path");
const fs = require("fs");

//Definir la función principal mdLinks
const mdLinks = () => {
//Obtener la ruta relativa del archivo desde los argumentos de línea de comandos
  const relativePath = process.argv[2];
// Determinar si se activó la opción --validate o --v desde los argumentos
  const validateOption =
    process.argv.includes("--validate") || process.argv.includes("--v");
//Determinar si se activó la opción --stats o --s desde los argumentos
  const statsOption =
    process.argv.includes("--stats") || process.argv.includes("--s");
  //const validateOption = process.argv.includes("--validate");
  //Variable para almacenar la ruta de usuario procesada
  let userPath;
  // VERIFICAR SI LA RUTA ExiSTE O NO utilizando fs.existsSync//
  if (fs.existsSync(relativePath)) {
    // console.log("La ruta SI existe");
  // La ruta existe
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

    //Leer el contenido del archivo en formato UTF-8
    const texto = fs.readFileSync(userPath, "utf-8");
    //console.log(texto);
  // Definir una expresión regular para buscar enlaces en formato [texto] (enlace)
    const regExp = /\[(.*?)\]\((?!#)(.*?)\)/g;
  // Inicializar variables para almacenar resultados de búsqueda  
    let result;
    let links = [];
   //Utilizar la expresión regular para encontrar todos los enlaces en el texto 
    while ((result = regExp.exec(texto)) !== null) {
  // Crear un objeto con información del enlace y agregarlo al array
      let objet = {
        href: result[(0, 2)],//result[2] contiene el enlace
        text: result[(0, 1)],//result[1] contiene el texto del enlace
        file: userPath, //Ruta del archivo donde se encontró en enlace
      };
      links.push(objet);
    } 
   //Inicializar contador para enlaces rotos 
    let cuentaRotos = 0;
   //Definir función asincrona para validar los enlaces 
    const validarLinks = async () => {
       //Desde acá empieza la validación
   //Inicializar array para almacenar promesas de peticiones HTTP    
       let arrayDePromesas = [];
   //Crear promesas para cada enlace y almacenarlas en el array    
       links.forEach((links) => {
         arrayDePromesas.push(fetch(links.href)); // Realizar peticiones HTTP a los enlaces
       });
  //Esperar a que se completen todas las promesas usando Promise.all()     
       await Promise.all(arrayDePromesas)
         .then((responses) => {
  //Crear un array de reasultados que incluye el estado y la validez de cada enlace       
           const results = responses.map((response, index) => {
             const link = links[index];
  //Si el enlace no es valido, incrementar el contador de enlaces rotos           
             if (!response.ok) cuentaRotos += 1; 
             return {
               href: link.href,
               text: link.text,
               file: link.file,
               status: response.status,
               ok: response.ok ? "ok" : "fail",
             };
           });
           console.log(results); //Imprimir resultados de la validación
         })
         .catch((error) => {
           console.error("Error al realizar las peticiones HTTP:", error);
           return [];
         });
    }
 //Definir función para mostrar estadísticas de los enlaces   
    const statsLinks = ()=> {
      const arrayDeLinks = links.map((obj) => {
        return obj.href;
      });
//Mostrar estadísticas de acuerdo a las opciones      
      if (validateOption) {
        console.log("\n", "Total: " + arrayDeLinks.length, "\n", "Unicos: " + new Set(arrayDeLinks).size,  "\n", "Rotos: " + cuentaRotos);
      } else {
        console.log("\n", "Total: " + arrayDeLinks.length, "\n", "Unicos: " + new Set(arrayDeLinks).size);
      }
    }
//Manejar diferentes opciones y ejecutar funciones correspondientes    
    if (validateOption && !statsOption) {
     validarLinks(); //Solo validar enlaces
    } else if (statsOption) {
      validarLinks().then(()=> statsLinks()); //Validar enlaces y mostrar estadisticas
    } else {
      console.log(links); //Mostrar los enlaces encontrados
    }
  } else {
    console.log("No se puede leer, no es archivo MD");
  }
};

//Llamar a la función mdLinks al ejecutar el script
mdLinks();

//Exportar la función mdLinks para su uso en otros módulos
module.exports = {
  mdLinks,
};
