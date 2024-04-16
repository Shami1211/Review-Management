const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./Config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

const RateRoute = require("./Routes/RateRoute.js")
const ComplaintRoute = require("./Routes/ComplaintRoute.js")
app.use(cors());
app.use(express.json());

//Routes
app.use('/rates', RateRoute);
app.use('/complaints', ComplaintRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 