// tests/auth.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const UserModel = require("../Models/usersModel");

describe("Auth Routes", () => {
  const testUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@test.com",
    password: "password123",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /register", () => {
    it("devrait enregistrer un nouvel utilisateur", async () => {
      const res = await request(app)
        .post("/register")
        .send(testUser)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Utilisateur enregistré avec succès !");
      expect(res.body.user.email).toBe(testUser.email);
    });

    it("devrait échouer si l'utilisateur existe déjà", async () => {
      const res = await request(app)
        .post("/register")
        .send(testUser)
        .expect(200);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("L'utilisateur exist déjà");
    });

    it("devrait échouer si des champs sont manquants", async () => {
      const res = await request(app)
        .post("/register")
        .send({ email: "test@test.com" })
        .expect(200);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Veuillez remplir tous les champs");
    });
  });

  describe("POST /login", () => {
    it("devrait connecter un utilisateur existant", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Connecté avec succès");
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(testUser.email);
    });

    it("devrait échouer si l'utilisateur n'existe pas", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "unknown@test.com", password: "123456" })
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Utilisateur non trouvé");
    });

    it("devrait échouer si le mot de passe est invalide", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: testUser.email, password: "wrongpass" })
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Mot de passe invalide");
    });

    it("devrait échouer si des champs sont manquants", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: testUser.email })
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Veuillez remplir tous les champs");
    });
  });
});
