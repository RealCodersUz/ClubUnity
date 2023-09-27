const { NotFoundError } = require("../../shared/errors");
const Room = require("./Room");

const editRoomService = async ({ id, ...changes }) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedRoom) {
      throw new NotFoundError("Room Not Found.");
    }

    return updatedRoom;
  } catch (error) {
    throw error;
  }
};

module.exports = editRoomService;
