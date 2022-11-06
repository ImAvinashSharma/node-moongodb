const { db } = require("../mongodb");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }
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
      expiresIn: "24h"
    });
    return res.status(200).json({ status: "ok", userId: resDat[0].userId, token });
  } else {
    return res.status(400).json({ status: "error" });
  }
};

module.exports = { login };
