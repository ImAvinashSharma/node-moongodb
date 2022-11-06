const { db } = require("./mongodb");

const preferences = async (req, res) => {
  const { preference, name, userId } = req.body;
  const { Food, Hobbies, Tsize, age, Technology, Experience } = preference;
  const collection = db.collection("preferencesTest");
  const result = await collection.updateOne({ userId: userId }, { $set: { name, Food, Hobbies, Tsize, age, Technology, Experience } });
  res.json({ result });
};

const getAllPref = async (req, res) => {
  const collection = db.collection("preferencesTest");
  const data = await collection.find({}).toArray();
  return res.json(data);
};

const getAllPrefById = async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("preferencesTest");
  const data = await collection.find({ userId: id }).toArray();
  res.json(data);
};

module.exports = { preferences, getAllPref, getAllPrefById };
