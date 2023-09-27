const { NotFoundError } = require("../../shared/errors");
const Category = require("./Category");

const removeCategory = async ({ id }) => {
  const existing = await Category.findById(id);

  if (!existing) {
    throw new NotFoundError("Category Not Found.");
  }

  await Category.findByIdAndDelete(existing._id);

  return "Category has been successfully removed.";
};

module.exports = removeCategory;
