const { NotFoundError } = require("../../shared/errors");
const Room = require("./Room");

const removeRoom = async ({ id }) => {
  const existing = await Room.findById(id);

  if (!existing) {
    throw new NotFoundError("Room Not Found.");
  }

  await Room.findByIdAndDelete(existing._id);

  return "Room has been successfully removed.";
};

module.exports = removeRoom;
