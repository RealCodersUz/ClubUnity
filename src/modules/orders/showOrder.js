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
      room_id: data.room_id,
      food_ids: data.food_ids,
      total_price: data.total_price,
      is_active: data.is_active,
      type: data.type,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showOrder;
