const { NotFoundError } = require("../../shared/errors");
const Order = require("./Order");

const removeOrder = async ({ id }) => {
  const existing = await Order.findById(id);

  if (!existing) {
    throw new NotFoundError("Order Not Found.");
  }

  await Order.findByIdAndDelete(existing._id);

  return "Order has been successfully removed.";
};

module.exports = removeOrder;
