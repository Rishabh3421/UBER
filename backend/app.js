const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const DbConn = require("./database/DBCon.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("../backend/routes/user.routes.js");

const app = express();
// Database connection
DbConn();

// Initialize express app and middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
