const { db } = require("./mongodb");

const addPref = async (req, res) => {
  const data = req.body;
  const collection = db.collection("test2");
  const result = await collection.insertOne({ data });
  res.json({ result, status: "ok" });
};

const updatePref = async (req, res) => {
  const data = req.body;
  const collection = db.collection("test2");
  const result = await collection.updateOne({ "data.userId": data.userId }, { $set: { data } });
  res.json({ data, result });
};

const getAllPref = async (req, res) => {
  const collection = db.collection("test1");
  const data = await collection.find({}).toArray();
  return res.json(data);
};

const getAllPrefById = async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("test2");
  const data = await collection.find({ userId: id }).toArray();
  res.json(data);
};

module.exports = { addPref, updatePref, getAllPref, getAllPrefById };
