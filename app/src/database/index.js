require("dotenv").config();

const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

const db = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Base de datos conectada"));
};

module.exports = db;
