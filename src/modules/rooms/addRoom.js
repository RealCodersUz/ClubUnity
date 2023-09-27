const Room = require("./Room");

const addRoom = async (data) => {
  const result = await Room.create({ ...data });

  return result;
};

module.exports = addRoom;
