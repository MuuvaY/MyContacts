// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "MyContacts API",
    description: "Documentation automatique générée avec swagger-autogen",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"]; // ton fichier principal où tes routes sont importées

swaggerAutogen(outputFile, endpointsFiles, doc);
