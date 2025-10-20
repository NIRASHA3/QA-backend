const express = require("express");
const connectDB = require("./Configure/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./Routes/UserRoutes");

dotenv.config();

const app = express();
app.use(cors({ origin:'*', credentials:false }));
app.use(express.json());
app.use("/", authRoute);


module.exports = app;
