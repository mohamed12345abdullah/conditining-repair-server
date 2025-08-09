require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require("./utils/connectMongoose");
connectDB.connectDB();

const logger = require("./utils/logger");


const cors = require("cors");

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require("path");
app.use("/",express.static(path.join(__dirname,"public")));

const orderRouter = require("./routes/ordefRouter");

app.use("/api/orders", orderRouter);



app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not Found api route"
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





