const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRoute = require("./Routes/usersRoute");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté"))
  .catch((err) => console.error("Erreur:", err));

app.use(usersRoute);

app.listen(PORT, () => {
  console.log(`Serveur sur ${PORT}`);
});
