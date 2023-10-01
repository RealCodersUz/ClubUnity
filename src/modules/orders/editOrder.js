const { NotFoundError } = require("../../shared/errors");
const Order = require("./Order");

const editOrderService = async ({ id, ...changes }) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedOrder) {
      throw new NotFoundError("Order Not Found.");
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

module.exports = editOrderService;
