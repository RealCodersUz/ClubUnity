const Order = require("./Order");

const addOrder = async (data) => {
  const result = await Order.create({ ...data });

  return result;
};

module.exports = addOrder;
