const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "MyContacts",
    description: "Description",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
