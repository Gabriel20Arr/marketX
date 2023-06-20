const { Router } = require("express");

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
ProductoRouter.post("/crearProductos", HandlerProducto);
ProductoRouter.put("/actualizar/:id", HadlerActualizar);
ProductoRouter.delete("/eliminar/:id", HandlerEliminar);

<<<<<<< HEAD
ProductoRouter.get("/:id", () => {});


module.exports = ProductoRouter;

=======
module.exports = ProductoRouter;
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
