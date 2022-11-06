const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("test");
  const data = await collection.find({ userId: id }).toArray();
  if (data[0] !== undefined) {
    return res.json({ data, admin: true });
  }
  return res.json({ data, admin: false });
};

function validateToken(req, res, next) {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      next();
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
}

module.exports = { validateToken, getUserById };
