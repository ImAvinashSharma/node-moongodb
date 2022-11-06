const { db } = require("./mongodb");

const search = async (req, res) => {
  const collection = db.collection("preferencesTest");
  let query = {};

  if (req.body.name !== undefined) {
    query.name = req.body.name;
  }
  if (req.body.userId !== undefined) {
    query.userId = req.body.userId;
  }
  if (req.body.Food !== undefined) {
    query.Food = req.body.Food;
  }
  if (req.body.Hobbies !== undefined) {
    query.Hobbies = req.body.Hobbies;
  }
  if (req.body.Tsize !== undefined) {
    query.Tsize = req.body.Tsize;
  }
  if (req.body.age !== undefined) {
    query.age = req.body.age;
  }
  if (req.body.Technology !== undefined) {
    query.Technology = req.body.Technology;
  }
  if (req.body.Experience !== undefined) {
    query.Experience = { $gte: req.body.Experience };
  }
  console.log("query", query);
  const result = await collection.find(query).toArray();
  return res.json(result);
};

module.exports = { search };
