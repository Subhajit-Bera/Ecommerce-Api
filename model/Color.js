const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Color", colorSchema);

