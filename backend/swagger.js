const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "MyContacts API",
    description: "API RESTful pour la gestion des contacts.",
    version: "1.0.0",
  },
  host: "localhost:8000", // adapte selon ton port local
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  tags: [
    { name: "Auth", description: "Inscription et connexion" },
    { name: "Contacts", description: "Gestion des contacts" },
  ],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Token JWT : Bearer <votre_token>",
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
    },
  },

  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        description: "Inscription d’un nouvel utilisateur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/RegisterUser" },
            },
          },
        },
        responses: {
          201: { description: "Utilisateur créé" },
          400: { description: "Erreur de validation" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        description: "Connexion d’un utilisateur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/LoginUser" },
            },
          },
        },
        responses: {
          200: { description: "Connexion réussie" },
          401: { description: "Identifiants invalides" },
        },
      },
    },
    "/api/contacts": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Liste des contacts",
        responses: {
          200: { description: "Liste récupérée" },
        },
      },
      post: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Créer un contact",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/Contact" },
            },
          },
        },
        responses: {
          201: { description: "Contact créé" },
        },
      },
    },
    "/api/contacts/{id}": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Détails d’un contact",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID du contact",
          },
        ],
        responses: {
          200: { description: "Contact trouvé" },
          404: { description: "Contact introuvable" },
        },
      },
      patch: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Mettre à jour un contact",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID du contact",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/Contact" },
            },
          },
        },
        responses: {
          200: { description: "Contact mis à jour" },
        },
      },
      delete: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Supprimer un contact",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID du contact",
          },
        ],
        responses: {
          200: { description: "Contact supprimé" },
        },
      },
    },
    "/api/search": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Rechercher des contacts",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            type: "string",
            description: "Mot-clé",
          },
        ],
        responses: {
          200: { description: "Résultats de la recherche" },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
