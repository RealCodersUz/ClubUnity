const { NotFoundError } = require("../../shared/errors");
const Category = require("./Category");

const editCategoryService = async ({ id, ...changes }) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedCategory) {
      throw new NotFoundError("Category Not Found.");
    }

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = editCategoryService;
