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

  tags: [
    {
      name: "Authentification",
      description: "Endpoints pour l'inscription et la connexion",
    },
    {
      name: "Contacts",
      description: "Gestion des contacts (CRUD)",
    },
  ],

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
    ContactUpdate: {
      firstName: "Marie",
      lastName: "Curie",
      email: "marie.curie@example.com",
      phone: "+33123456789",
      address: "12 rue de la Paix, Paris",
      company: "CNRS",
      notes: "Contact de recherche mis à jour",
    },
    AuthResponse: {
      success: true,
      message: "Connexion réussie",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: {
        id: "60d5ec49f1b2c72b8c8e4f1a",
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
      },
    },
    ContactResponse: {
      success: true,
      contact: {
        id: "60d5ec49f1b2c72b8c8e4f1b",
        firstName: "Marie",
        lastName: "Curie",
        email: "marie.curie@example.com",
        phone: "+33123456789",
        address: "12 rue de la Paix, Paris",
        company: "CNRS",
        notes: "Contact de recherche",
        createdAt: "2025-10-09T10:30:00.000Z",
        updatedAt: "2025-10-09T10:30:00.000Z",
      },
    },
    ContactsResponse: {
      success: true,
      contacts: [
        {
          id: "60d5ec49f1b2c72b8c8e4f1b",
          firstName: "Marie",
          lastName: "Curie",
          email: "marie.curie@example.com",
          phone: "+33123456789",
          address: "12 rue de la Paix, Paris",
          company: "CNRS",
          notes: "Contact de recherche",
          createdAt: "2025-10-09T10:30:00.000Z",
          updatedAt: "2025-10-09T10:30:00.000Z",
        },
      ],
      total: 1,
    },
    ErrorResponse: {
      success: false,
      message: "Une erreur est survenue",
      error: "Détails de l'erreur",
    },
  },

  // Documentation des routes
  "@schemas": {
    // Routes d'authentification (non protégées)
    "/register": {
      post: {
        tags: ["Authentification"],
        summary: "Inscription d'un nouvel utilisateur",
        description:
          "Crée un nouveau compte utilisateur et retourne un token JWT",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/RegisterUser",
            },
          },
        ],
        responses: {
          201: {
            description: "Compte créé avec succès",
            schema: {
              $ref: "#/definitions/AuthResponse",
            },
          },
          400: {
            description: "Données invalides ou email déjà utilisé",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Authentification"],
        summary: "Connexion utilisateur",
        description: "Authentifie un utilisateur et retourne un token JWT",
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/LoginUser",
            },
          },
        ],
        responses: {
          200: {
            description: "Connexion réussie",
            schema: {
              $ref: "#/definitions/AuthResponse",
            },
          },
          401: {
            description: "Identifiants incorrects",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
          400: {
            description: "Requête invalide",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
    },

    // Routes des contacts (protégées)
    "/contacts": {
      get: {
        tags: ["Contacts"],
        summary: "Récupérer tous les contacts",
        description:
          "Retourne la liste de tous les contacts de l'utilisateur connecté",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "page",
            type: "integer",
            description: "Numéro de page",
            default: 1,
          },
          {
            in: "query",
            name: "limit",
            type: "integer",
            description: "Nombre de contacts par page",
            default: 10,
          },
        ],
        responses: {
          200: {
            description: "Liste des contacts récupérée avec succès",
            schema: {
              $ref: "#/definitions/ContactsResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
      post: {
        tags: ["Contacts"],
        summary: "Créer un nouveau contact",
        description: "Ajoute un nouveau contact à la liste",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Contact",
            },
          },
        ],
        responses: {
          201: {
            description: "Contact créé avec succès",
            schema: {
              $ref: "#/definitions/ContactResponse",
            },
          },
          400: {
            description: "Données invalides",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
    },
    "/search": {
      get: {
        tags: ["Contacts"],
        summary: "Rechercher des contacts",
        description:
          "Recherche des contacts par nom, email, téléphone ou entreprise",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "q",
            type: "string",
            required: true,
            description: "Terme de recherche",
          },
        ],
        responses: {
          200: {
            description: "Résultats de recherche",
            schema: {
              $ref: "#/definitions/ContactsResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
    },
    "/contacts/{id}": {
      get: {
        tags: ["Contacts"],
        summary: "Récupérer un contact par ID",
        description: "Retourne les détails d'un contact spécifique",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID du contact",
          },
        ],
        responses: {
          200: {
            description: "Contact trouvé",
            schema: {
              $ref: "#/definitions/ContactResponse",
            },
          },
          404: {
            description: "Contact non trouvé",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
      patch: {
        tags: ["Contacts"],
        summary: "Mettre à jour un contact",
        description:
          "Modifie les informations d'un contact existant (mise à jour partielle)",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID du contact",
          },
          {
            in: "body",
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/ContactUpdate",
            },
          },
        ],
        responses: {
          200: {
            description: "Contact mis à jour avec succès",
            schema: {
              $ref: "#/definitions/ContactResponse",
            },
          },
          404: {
            description: "Contact non trouvé",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
      delete: {
        tags: ["Contacts"],
        summary: "Supprimer un contact",
        description: "Supprime définitivement un contact",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
            required: true,
            description: "ID du contact",
          },
        ],
        responses: {
          200: {
            description: "Contact supprimé avec succès",
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                message: {
                  type: "string",
                  example: "Contact supprimé avec succès",
                },
              },
            },
          },
          404: {
            description: "Contact non trouvé",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
          401: {
            description: "Non authentifié",
            schema: {
              $ref: "#/definitions/ErrorResponse",
            },
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
