const { db } = require("../mongodb");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const data = req.body;
  const collection = db.collection("test");
  if (!(data.email && data.password && data.name)) {
    res.status(400).send("All input is required");
  }
  const oldUser = await collection.findOne({ email: data.email });
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  const data1 = await collection.insertOne({ userId: uuidv4(), data });
  console.log(data1);
  return res.status(200).json({ status: "Ohk" });
};

module.exports = { register };
