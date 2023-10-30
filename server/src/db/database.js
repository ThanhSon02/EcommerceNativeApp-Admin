const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://thanhsonhw:thanhsonhw@cluster0.voccstn.mongodb.net/EcommerceApp"
        );
        console.log("Connecting to DB successfully!");
    } catch (error) {
        console.log("Connecting to DB failure!!");
    }
};

module.exports = { connectDB };
