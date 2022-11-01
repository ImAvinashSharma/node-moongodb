const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const { validateToken } = require("./validation");

// MiddlewareStack
app.use(express.json());
app.use(cors());
dotenv.config();

const url = "mongodb://20.244.48.206:27017";
const client = new MongoClient(url);

const dbName = "test";

(async () => {
  await client.connect();
  console.log("Connected successfully to MongoDB");
})();

app.post("/api/register", async (req, res) => {
  const data = req.body;
  const db = client.db(dbName);
  const collection = db.collection("test");
  if (!(data.email && data.password && data.name)) {
    res.status(400).send("All input is required");
  }
  const oldUser = await collection.findOne({ email: data.email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  collection.insertOne({ userId: uuidv4(), data });
  return res.status(200).json({ status: "Ohk" });
});

// For testing purposes
app.get("/api/getData", validateToken, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("test");
  const findResult = await collection.find({}).toArray();
  return res.json(findResult);
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }
  const db = client.db(dbName);
  const collection = db.collection("test");
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const resDat = await collection
    .find({
      "data.email": email,
      "data.password": password
    })
    .toArray();
  if (resDat[0] !== undefined) {
    const token = jwt.sign(resDat[0].data, jwtSecretKey, {
      expiresIn: "2h"
    });
    return res.status(200).json({ status: "ok", userId: resDat[0].userId, token });
  } else {
    return res.status(400).json({ status: "error", user: null });
  }
});

app.post("/api/addPref", validateToken, async (req, res) => {
  const data = req.body;
  const db = client.db(dbName);
  const collection = db.collection("test2");
  collection.insertOne({ data });
  res.json({ data, result });
});

app.post("/api/updatePref", validateToken, async (req, res) => {
  const data = req.body;
  const db = client.db(dbName);
  const collection = db.collection("test2");
  const result = await collection.updateOne({ "data.userId": data.userId }, { $set: { data } });
  res.json({ data, result });
});

app.get("/api/getAllPref", validateToken, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("test1");
  const data = await collection.find({}).toArray();
  return res.json(data);
});

app.get("/api/getUser/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const db = client.db(dbName);
  const collection = db.collection("test");
  const findResult = await collection.find({ userId: id }).toArray();
  return res.json(findResult);
});

app.get("/api/getUserPref/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const db = client.db(dbName);
  const collection = db.collection("test2");
  const data = await collection.find({ "data.userId": id }).toArray();
  res.json(data);
});

app.post("/search", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("test1");
  let query = {};

  if (req.body.username !== undefined) {
    query.name = req.body.name;
  }
  if (req.body.food !== undefined) {
    query.food = req.body.food;
  }
  if (req.body.workSkills !== undefined) {
    query.workSkills = { $all: req.body.workSkills };
  }
  if (req.body.experience !== undefined) {
    query.experience = { $gte: req.body.experience };
  }
  if (req.body.roles !== undefined) {
    query.roles = req.body.roles;
  }
  if (req.body.foodHabbits !== undefined) {
    query.foodHabbits = { $all: req.body.foodHabbits };
  }
  if (req.body.shirtSize !== undefined) {
    query.shirtSize = req.body.shirtSize;
  }
  if (req.body.sports !== undefined) {
    query.sports = { $all: req.body.sports };
  }
  if (req.body.talents !== undefined) {
    query.talents = { $all: req.body.talents };
  }
  if (req.body.worktype !== undefined) {
    query.worktype = req.body.worktype;
  }
  console.log(query);
  // const query = {professionalSkills:{$all:['react']}}
  //console.log(query);
  const result = await collection.find(query);
  var array = [];
  await result.forEach(data => {
    array.push(data);
  });
  res.json(array);
});

app.listen(6969, () => {
  console.log("port 6969");
});
