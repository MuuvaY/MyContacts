const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const usersRoute = require("./Routes/usersRoute");
const authRoute = require("./Routes/authRoute");
const contactRoute = require("./Routes/contactsRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté"))
  .catch((err) => console.error("Erreur:", err));

app.use(usersRoute);
app.use(authRoute);
app.use(contactRoute);

app.listen(PORT, () => {
  console.log(`Serveur sur ${PORT}`);
});
