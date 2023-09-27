const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    room_number: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    type_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    room_active: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
