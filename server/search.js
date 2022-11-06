const search = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("test1");
  let query = {};

  if (req.body.name !== undefined) {
    query.name = req.body.name;
  }
  if (req.body.food !== undefined) {
    query.food = req.body.food;
  }
  if (req.body.hobbies !== undefined) {
    query.hobbies = req.body.hobbies;
  }
  if (req.body.tsize !== undefined) {
    query.tsize = req.body.tsize;
  }
  if (req.body.age !== undefined) {
    query.age = req.body.age;
  }
  if (req.body.technology !== undefined) {
    query.technology = req.body.technology;
  }
  if (req.body.experience !== undefined) {
    query.experience = { $gte: req.body.experience };
  }
  console.log(query);

  const result = await collection.find(query);
  var array = [];
  await result.forEach(data => {
    array.push(data);
  });
  res.json(array);
};

module.exports = { search };
