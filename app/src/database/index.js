require("dotenv").config();
const mongoose = require("mongoose");
const { URL } = process.env;

const db = async () => {
  await mongoose.connect(URL).then(() => console.log("Estamos Conectado"));
};

module.exports = db;
