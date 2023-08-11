const { describe } = require("node:test");
const {
  verificarRuta,
  rutaAbsoluta,
  extencionRuta,
  extraerLinks,
} = require("../functions");

const routeRelative = "files";
const routeAbsolute = "C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files";

describe("rutaAbsoluta", () => {
  it("Debería retornar de una ruta relativa a absoluta", () => {
    expect(rutaAbsoluta(routeRelative)).toBe(routeAbsolute);
  });
  it("Deberia retornar una ruta absoluta", () => {
    expect(rutaAbsoluta("C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files")).toBe(
      "C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files"
    );
  });
});

describe("verificarRuta", () => {
  it("Deberia retornar la rura existente", () => {
    expect(verificarRuta("C:\\Users\\ktik0\\OneDrive\\Desktop\\DEV007-md-links\\files")).toBe(true);
  });
  it("Deberia retornar false para una ruta que no existe", () => {
    try {
      verificarRuta("/v/c/holamundo.md");
    } catch (error) {
      expect(error).toBe(false);
    }
  });
});

describe("extencionRuta", () => {
  it("Deberia retornar que no es un archivo .md", () => {
    try {
      extencionRuta("./files/texto.txt");
    } catch (error) {
      expect(error).toBe("no es un archivo .md");
    }
  });
});

describe("extraerLinks", () => {
  it("Deberia retornar un array vacio si no encuentra ningun enlace", () => {
    const enlaces = "hola";
    const ruta = "./files/pruebas.md";
    const respuesta = extraerLinks(ruta, enlaces);
    expect(respuesta).toEqual([]);
  });
  
  it("It should return an array with the links found", () => {
    const enlacesReales =
      "[Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)";
    const laRuta = "./files/prueba3.md";
    const resultados = extraerLinks(laRuta, enlacesReales);
    expect(resultados.length).toBe(1);
  });
});