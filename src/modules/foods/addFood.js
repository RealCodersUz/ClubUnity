const Food = require("./Food");

const addFood = async (data) => {
  const result = await Food.create({ ...data });

  return result;
};

module.exports = addFood;
