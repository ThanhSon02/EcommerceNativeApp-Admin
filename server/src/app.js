const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./routes");
const port = process.env.PORT || 3001;
const db = require("./db/database");

app.use(cors({ credentials: true, origin: "*" }));
cloudinary.config({
    cloud_name: "dgpcbcvhq",
    api_key: "157747762762188",
    api_secret: "2Sjw2N5NjJr1f5Iim7whbO4-ReY",
});

app.use(cookieParser());
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));

// Connect to db
db.connectDB();

route(app);

app.listen(port, () => {
    console.log("App listen on port", port);
});
