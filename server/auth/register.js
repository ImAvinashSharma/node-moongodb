const { db } = require("../mongodb");
const { v4: uuidv4 } = require("uuid");

const userId = uuidv4();

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const collection = db.collection("userTest");
    if (!(name && email && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await collection.findOne({ email: email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    await collection.insertOne({ userId, name, email, password });
    res.status(200).json({ status: "Ohk" });
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
};

const prePreference = async (req, res) => {
  const collection = db.collection("preferencesTest");
  await collection.insertOne({ Food: "", Hobbies: "", Tsize: "", age: "", Technology: "", Experience: "", name: "", userId });
};

module.exports = { register, prePreference };
