const { NotFoundError } = require("../../shared/errors");
const Food = require("./Food");

const showFood = async ({ id }) => {
  try {
    const data = await Food.findById(id);
    if (!data) {
      throw new NotFoundError("Food Not Found.");
    }

    console.log(data);

    const result = {
      // _id: data._id,
      uz_name: data.uz_name,
      ru_name: data.ru_name,
      type: data.type,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showFood;
