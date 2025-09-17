import express from "express";
import UserModel from "../Models/usersModel";

app.get("/getUsers", async (req, res) => {
  const userData = await UserModel.find;
  res.json(userData);
});
