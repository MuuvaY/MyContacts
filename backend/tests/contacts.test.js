// tests/contacts.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const UserModel = require("../Models/usersModel");
const ContactModel = require("../Models/contactsModel");
const JWT = require("jsonwebtoken");

describe("Contact Routes", () => {
  let token;
  let userId;
  let contactId;

  const testUser = {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@test.com",
    password: "password123",
  };

  const testContact = {
    firstName: "Alice",
    lastName: "Smith",
    phone: "1234567890",
    email: "alice@test.com",
    genre: "F",
    address: "123 Rue Test",
    postalCode: "75001",
    city: "Paris",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await UserModel.deleteMany({});
    await ContactModel.deleteMany({});

    // Création utilisateur test et token
    const user = new UserModel({
      ...testUser,
      password: await require("../helpers/authHelpers").hashPassword(
        testUser.password
      ),
    });
    await user.save();
    userId = user._id;

    token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await ContactModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /contacts", () => {
    it("devrait créer un contact", async () => {
      const res = await request(app)
        .post("/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send(testContact)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Contact créé avec succès");
      expect(res.body.contact.firstName).toBe(testContact.firstName);
      contactId = res.body.contact._id;
    });

    it("devrait échouer si firstName ou lastName manquant", async () => {
      const res = await request(app)
        .post("/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send({ phone: "0987654321" })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Le prénom et le nom sont obligatoires");
    });
  });

  describe("GET /contacts", () => {
    it("devrait récupérer tous les contacts", async () => {
      const res = await request(app)
        .get("/contacts")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.contacts.length).toBeGreaterThan(0);
    });
  });

  describe("GET /contacts/:id", () => {
    it("devrait récupérer un contact par ID", async () => {
      const res = await request(app)
        .get(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.contact._id).toBe(contactId);
    });

    it("devrait retourner 404 si contact non trouvé", async () => {
      const res = await request(app)
        .get(`/contacts/000000000000000000000000`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Contact non trouvé");
    });
  });

  describe("PATCH /contacts/:id", () => {
    it("devrait mettre à jour un contact", async () => {
      const res = await request(app)
        .patch(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ city: "Lyon" })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.contact.city).toBe("Lyon");
    });

    it("devrait retourner 404 si contact non trouvé", async () => {
      const res = await request(app)
        .patch(`/contacts/000000000000000000000000`)
        .set("Authorization", `Bearer ${token}`)
        .send({ city: "Marseille" })
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe(
        "Contact non trouvé ou vous n'avez pas les droits"
      );
    });
  });

  describe("DELETE /contacts/:id", () => {
    it("devrait supprimer un contact", async () => {
      const res = await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Contact supprimé avec succès");
    });

    it("devrait retourner 404 si contact non trouvé", async () => {
      const res = await request(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe(
        "Contact non trouvé ou vous n'avez pas les droits"
      );
    });
  });
});
