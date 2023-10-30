const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const authRouter = require("./authRouter");
const orderRouter = require("./orderRouter");

function route(app) {
    app.all("/", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.use("/api/v1/order", orderRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/product", productRouter);
    app.use("/api/v1/auth", authRouter);
}

module.exports = route;
