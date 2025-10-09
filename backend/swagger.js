const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "📇 MyContacts API",
    description:
      "API RESTful pour la gestion des contacts.\n\n" +
      "Cette documentation est générée automatiquement avec swagger-autogen. 💡\n\n" +
      "🔐 Certaines routes nécessitent un token JWT.\n" +
      "👉 Connectez-vous via `/api/auth/login` pour récupérer un token et ajoutez-le dans le bouton *Authorize* (en haut à droite).",
    version: "1.0.0",
  },

  host: "localhost:8000", // adapte selon ton port local
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],

  tags: [
    {
      name: "Auth",
      description:
        "Routes liées à l'inscription et la connexion des utilisateurs 🔑",
    },
    {
      name: "Contacts",
      description: "Routes pour gérer les contacts personnels 📒",
    },
  ],

  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Saisissez votre token JWT sous la forme : `Bearer <votre_token>`",
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

  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        description: "Inscription d’un nouvel utilisateur 👤",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/RegisterUser" },
            },
          },
        },
        responses: {
          201: { description: "Utilisateur créé avec succès ✅" },
          400: { description: "Erreur de validation ❌" },
        },
      },
    },

    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        description: "Connexion d’un utilisateur existant 🔐",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/LoginUser" },
            },
          },
        },
        responses: {
          200: { description: "Connexion réussie, token renvoyé 🔑" },
          401: { description: "Identifiants invalides ❌" },
        },
      },
    },

    "/api/contacts": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Récupérer la liste de tous les contacts 📋",
        responses: {
          200: { description: "Liste des contacts récupérée avec succès ✅" },
        },
      },
      post: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Créer un nouveau contact ➕",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/Contact" },
            },
          },
        },
        responses: {
          201: { description: "Contact créé avec succès ✅" },
        },
      },
    },

    "/api/contacts/{id}": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Obtenir les détails d’un contact via son ID 🔍",
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
          200: { description: "Contact trouvé ✅" },
          404: { description: "Contact introuvable ❌" },
        },
      },
      patch: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Mettre à jour les informations d’un contact ✏️",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID du contact à modifier",
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
          200: { description: "Contact mis à jour ✅" },
        },
      },
      delete: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Supprimer un contact 🗑️",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID du contact à supprimer",
          },
        ],
        responses: {
          200: { description: "Contact supprimé avec succès ✅" },
        },
      },
    },

    "/api/search": {
      get: {
        tags: ["Contacts"],
        security: [{ BearerAuth: [] }],
        description: "Rechercher des contacts selon un mot-clé 🔎",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            type: "string",
            description: "Mot-clé à rechercher dans les contacts",
          },
        ],
        responses: {
          200: { description: "Résultats de la recherche renvoyés ✅" },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
