const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "📇 MyContacts API",
    description:
      "API RESTful pour la gestion des contacts. Cette documentation est générée automatiquement avec swagger-autogen. 💡\n\n" +
      "🔐 Certaines routes nécessitent un token JWT.\n" +
      "👉 Connectez-vous via `/login` pour récupérer un token et ajoutez-le dans le bouton *Authorize* (en haut à droite).",
    version: "1.0.0",
  },
  host: "localhost:8000",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Saisissez le token JWT sous la forme : `Bearer <votre_token>`",
    },
  },

  definitions: {
    RegisterUser: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      password: "123456",
    },
    LoginUser: {
      email: "jean.dupont@example.com",
      password: "123456",
    },
    Contact: {
      firstName: "Marie",
      lastName: "Curie",
      email: "marie.curie@example.com",
      phone: "+33123456789",
      address: "12 rue de la Paix, Paris",
      company: "CNRS",
      notes: "Contact de recherche",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
