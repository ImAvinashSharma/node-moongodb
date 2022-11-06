const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { validateToken, getUserById } = require("./validation");
const { preferences, getAllPref, getAllPrefById } = require("./preferences");
const { db } = require("./mongodb");
const { register, prePreference } = require("./auth/register");
const { login } = require("./auth/login");
const { search } = require("./search");

// MiddlewareStack
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/api/register", register, prePreference);

app.post("/api/login", login);

app.post("/api/preferences", validateToken, preferences);

app.get("/api/getAllPref", validateToken, getAllPref);

app.get("/api/getUser/:id", validateToken, getUserById);

app.get("/api/getUserPref/:id", validateToken, getAllPrefById);

app.post("/api/search", validateToken, search);

app.listen(6969, () => {
  console.log("port 6969");
});
