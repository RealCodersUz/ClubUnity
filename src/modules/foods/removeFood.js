const { NotFoundError } = require("../../shared/errors");
const Food = require("./Food");

const removeFood = async ({ id }) => {
  const existing = await Food.findById(id);

  if (!existing) {
    throw new NotFoundError("Food Not Found.");
  }

  await Food.findByIdAndDelete(existing._id);

  return "Food has been successfully removed.";
};

module.exports = removeFood;
