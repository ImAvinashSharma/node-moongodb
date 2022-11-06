const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { validateToken, getUserById } = require("./validation");
const { addPref, updatePref, getAllPref, getAllPrefById } = require("./preferences");
const { db } = require("./mongodb");
const { register } = require("./auth/register");
const { login } = require("./auth/login");
const { search } = require("./search");

// MiddlewareStack
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/api/register", register);

app.post("/api/login", login);

app.post("/api/addPref", validateToken, addPref);

app.post("/api/updatePref", validateToken, updatePref);

app.get("/api/getAllPref", validateToken, getAllPref);

// For Testing
app.get("/search", async (req, res) => {
  const collection = db.collection("test2");
  const result = await collection.find().toArray();
  res.json(result);
});

app.get("/api/getUser/:id", validateToken, getUserById);

app.get("/api/getUserPref/:id", validateToken, getAllPrefById);

app.post("/api/search", validateToken, search);

app.listen(6969, () => {
  console.log("port 6969");
});
