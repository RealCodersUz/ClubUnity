const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
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

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = Categories;
