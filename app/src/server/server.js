const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mercadopago= require('mercadopago')


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(require('../routes/index.routes'))

module.exports = app;
