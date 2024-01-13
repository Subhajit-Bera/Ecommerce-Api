const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
            ref: "Brand",
            required: true,
        },
        category: {
            type: String,
            ref: "Category",
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },
        totalQty: {
            type: Number,
            min: [0, "stock already empty"],
            required: true,
        },

    },
    {
        timestamps: true,
    }
);


//Making model and export
module.exports = mongoose.model("Product", productSchema);

