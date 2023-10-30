const Product = require("../models/productModal");
const Order = require("../models/orderModal");
class orderController {
    createOrder = async (req, res) => {
        try {
            const { user, orderItems, totalPrice, isDelivered } = req.body;
            const update = orderItems.map((order) => {
                return {
                    updateOne: {
                        filter: { _id: order.product._id },
                        update: {
                            $inc: {
                                in_stock: -order.quantity,
                                selled: +order.quantity,
                            },
                        },
                    },
                };
            });
            await Product.bulkWrite(update);
            await Order.create({
                orderItems,
                totalPrice,
                user,
                isDelivered,
            });
            res.status(200).json({
                message: "Create order successfull",
            });
        } catch (error) {
            res.status(401).json({
                message: "Create order fail",
            });
        }
    };

    // get user order
    getOrder = async (req, res) => {
        try {
            const userID = req.user.id;
            console.log(userID);
            const userOrder = await Order.find({ "user._id": userID });
            res.status(200).json({ userOrder });
        } catch (error) {
            res.status(403).json({
                message: "Get your order failure",
            });
        }
    };

    // get all order by admin
    getAllOrder = async (req, res) => {
        try {
            const allOrder = await Order.find();
            res.status(200).json({
                allOrder,
            });
        } catch (error) {
            res.status(402).json({
                message: "Get all order failure",
            });
        }
    };

    // update order status
    // updateOrderStatus = async (req, res) => {
    //     try {
    //         console.log(req.body);
    //         const orderID = req.body.orderID;
    //         console.log(req.body);
    //         const orderUpdated = await Order.findByIdAndUpdate(
    //             orderID,
    //             {
    //                 isPaid: true,
    //                 isDelivered: true,
    //             },
    //             { returnDocument: "after" }
    //         );
    //         res.status(200).json({
    //             orderUpdated,
    //             message: "Update order status successfull",
    //         });
    //     } catch (error) {
    //         res.status(402).json({
    //             message: "Update order status failure",
    //         });
    //     }
    // };
}

module.exports = new orderController();
