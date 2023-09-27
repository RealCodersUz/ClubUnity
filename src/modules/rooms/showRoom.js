const { NotFoundError } = require("../../shared/errors");
const Room = require("./Room");

const showRoom = async ({ id }) => {
  try {
    const data = await Room.findById(id);
    if (!data) {
      throw new NotFoundError("Room Not Found.");
    }

    console.log(data);

    const result = {
      // _id: data._id,
      type_name: data.type_name,
      room_number: data.room_number,
      room_active: data.room_active,
      price: data.price,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showRoom;
