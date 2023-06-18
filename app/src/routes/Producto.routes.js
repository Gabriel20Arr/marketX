const { Router } = require("express");
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta donde se guardarán los archivos
    cb(null, 'ruta/del/directorio');
  },
  filename: (req, file, cb) => {
    // Nombre del archivo guardado
    cb(null, file.originalname);
  },
});

// Middleware de multer
const upload = multer({ storage });

const {
  HandlerAllProductos,
  HandlerIdProductos,
  HandlerProducto,
  HadlerActualizar,
  HandlerEliminar,
} = require("../handlers/handler.producto");

const ProductoRouter = Router();

ProductoRouter.get("/", HandlerAllProductos);
ProductoRouter.get("/:id", HandlerIdProductos);
ProductoRouter.post("/crearProductos",  upload.single('image') ,HandlerProducto);
ProductoRouter.put("/actualizar/:id", HadlerActualizar);
ProductoRouter.delete("/eliminar/:id", HandlerEliminar);

module.exports = ProductoRouter;
