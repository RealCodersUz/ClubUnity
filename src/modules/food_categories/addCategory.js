const Category = require("./Category");

const addCategory = async (data) => {
  const result = await Category.create({ ...data });

  return result;
};

module.exports = addCategory;
