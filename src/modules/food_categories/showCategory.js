const { NotFoundError } = require("../../shared/errors");
const Category = require("./Category");

const showCategory = async ({ id }) => {
  try {
    const data = await Category.findById(id);
    if (!data) {
      throw new NotFoundError("Category Not Found.");
    }

    console.log(data);

    const result = {
      // _id: data._id,
      uz_name: data.uz_name,
      ru_name: data.ru_name,
      type: data.type,
      price: data.price,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showCategory;
