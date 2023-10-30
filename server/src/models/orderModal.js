const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                product: {
                    product_name: { type: String, require: true },
                    price: { type: Number, require: true },
                    in_stock: { type: Number, require: true },
                    product_img: { type: String },
                    discount: Number,
                },
                quantity: { type: Number, require: true, default: 1 },
            },
        ],
        totalPrice: { type: Number, required: true },
        user: {
            _id: {
                type: String,
                require: true,
            },
            name: { type: String },
            email: { type: String, required: true },
            phone: { type: String, require: true },
            address: { type: String, required: true },
        },
        isDelivered: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
