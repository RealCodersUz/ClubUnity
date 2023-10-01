const { NotFoundError } = require("../../shared/errors");
const Food = require("./Food");

const editFoodService = async ({ id, ...changes }) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedFood) {
      throw new NotFoundError("Food Not Found.");
    }

    return updatedFood;
  } catch (error) {
    throw error;
  }
};

module.exports = editFoodService;
