const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    uz_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    ru_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    img: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    price: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    type: {
      type: mongoose.SchemaTypes.String,
      enum: ["good", "food"],
    },
    categories_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Categories",
      required: true,
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

const Food = mongoose.model("Food", FoodSchema);
FoodSchema.virtual("categories", {
  ref: "Categories",
  localField: "categories_id",
  foreignField: "_id",
  count: true,
});

module.exports = Food;
