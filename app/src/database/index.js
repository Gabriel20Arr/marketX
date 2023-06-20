require("dotenv").config();

const mongoose = require("mongoose");

const { URL } = process.env;

const db = async () => {
  await mongoose
    .connect(URL)
    .then(() => console.log("Base de datos conectada"));
};

module.exports = db;
