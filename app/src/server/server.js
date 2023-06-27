const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mercadopago = require("mercadopago");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err); // Registra el error en la consola del servidor
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir acceso desde cualquier dominio (Cambia el asterisco por el dominio específico si es necesario)
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas
app.use(require("../routes/index.routes"));

// Manejador de errores
app.use(errorHandler);

module.exports = app;