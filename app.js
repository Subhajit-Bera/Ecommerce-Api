const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
dbConnect();

app.use(express.json());


const brand = require("./routes/brandRoute");
const category = require("./routes/categoryRoute");
const color = require("./routes/colorRoute");
const product=require("./routes/productRoute");


app.use("/api/v1", brand);
app.use("/api/v1", category);
app.use("/api/v1", category);
app.use("/api/v1", color);
app.use("/api/v1", product);


app.listen(process.env.PORT || 8001, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${process.env.PORT}`);
});

module.exports = app;