const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },

    food_ids: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Food",
      required: true,
    },
    total_price: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ["vip", "simple"],
    },
    time: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    is_active: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
OrderSchema.virtual("Food", {
  ref: "Food",
  localField: "food_ids",
  foreignField: "_id",
  // count: true,
});

module.exports = Order;
