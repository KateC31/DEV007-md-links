//Importar módulos y funciones necesarios para las pruebas
const { describe } = require("node:test");//Importar la función describe para agrupar pruebas
const {
  verificarRuta,
  rutaAbsoluta,
  extencionRuta,
  extraerLinks,
} = require("../functions"); //Importar las funciones a probar desde el módulo functions.js

//Definir rutas relativas y absoluta para usar en las pruebas
const routeRelative = "files";
const routeAbsolute = "C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files";

//Grupo de pruebas para la función rutaAbsoluta
describe("rutaAbsoluta", () => {
  it("Debería retornar de una ruta relativa a absoluta", () => {
//Verificar que la función rutaAbsoluta convierte una ruta relativa en una ruta absoluta    
    expect(rutaAbsoluta(routeRelative)).toBe(routeAbsolute);
  });
  it("Deberia retornar una ruta absoluta", () => {
//Verificar que la función rutaAbsoluta mantiene una ruta absoluta sin cambios    
    expect(rutaAbsoluta("C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files")).toBe(
      "C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files"
    );
  });
});

//Grupo de pruebas para la función verificarRuta
describe("verificarRuta", () => {
  it("Deberia retornar la rura existente", () => {
//Verificar que la ruta verificarRuta devuelve true para una ruta existente
    expect(verificarRuta("C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files")).toBe(true);
  });
  it("Deberia retornar false para una ruta que no existe", () => {
//Verificar que la función verificarRuta arroja una excepción (error) para una ruta inexistente  
    try {
      verificarRuta("/v/c/holamundo.md");
    } catch (error) {
      expect(error).toBe(false); //Verificar que el error arrojado es igual a false
    }
  });
});

//Grupo de pruebas para la función extencionRuta
describe("extencionRuta", () => {
  it("Deberia retornar que no es un archivo .md", () => {
//Verificar que la función extencionRuta arroja una excepción con el mensaje esperado
    try {
      extencionRuta("./files/texto.txt");
    } catch (error) {
      expect(error).toBe("no es un archivo .md");
    }
  });
});

//Grupo de pruebas para la función extraerLinks
describe("extraerLinks", () => {
  it("Deberia retornar un array vacio si no encuentra ningun enlace", () => {
// Preparar los valores de entrada para la prueba    
    const enlaces = "hola";
    const ruta = "./files/pruebas.md";
//Ejecutar la función extraerLinks con los valores de entrada    
    const respuesta = extraerLinks(ruta, enlaces);
//Verificar que la función devuelve un array vacío    
    expect(respuesta).toEqual([]);
  });
  
  it("It should return an array with the links found", () => {
//Preparar los valores de entrada para la prueba    
    const enlacesReales =
      "[Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)";
    const laRuta = "./files/prueba3.md";
//Ejecutar la función extraerLinks con los valores de entrada    
    const resultados = extraerLinks(laRuta, enlacesReales);
//Verificar que la función devuelve un array con la longitud esperada    
    expect(resultados.length).toBe(1);
  });
});