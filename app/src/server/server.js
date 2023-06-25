const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mercadopago = require("mercadopago");
const fileUpload = require("express-fileupload");

const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err); // Registra el error en la consola del servidor
  res.status(500).json({ error: 'Error interno del servidor' });
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);
app.use(require("../routes/index.routes"));
app.use(errorHandler);

module.exports = app;
