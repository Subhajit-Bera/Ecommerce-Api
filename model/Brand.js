const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
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

//Making model and export
module.exports = mongoose.model("Brand", brandSchema);