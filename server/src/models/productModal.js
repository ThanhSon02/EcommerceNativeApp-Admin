const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        product_name: { type: String, require: true },
        product_img: { type: String },
        price: { type: Number, require: true },
        category: { type: String, require: true },
        in_stock: { type: Number, require: true },
        selled: { type: Number, default: 0 },
        description: String,
        discount: Number,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
