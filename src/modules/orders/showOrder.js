const { NotFoundError } = require("../../shared/errors");
const Order = require("./Order");

const showOrder = async ({ id }) => {
  try {
    const data = await Order.findById(id);
    if (!data) {
      throw new NotFoundError("Order Not Found.");
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

module.exports = showOrder;
