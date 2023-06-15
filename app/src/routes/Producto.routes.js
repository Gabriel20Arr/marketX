const { Router } = require("express");

const {
  HandlerProducto,
  HandlerAllProductos,
  HadlerActualizar,
  HandlerEliminar,
} = require("../handlers/handler.producto");

const ProductoRouter = Router();
// ProductoRouter.get("/:id", () => {});

ProductoRouter.get("/", HandlerAllProductos);
ProductoRouter.post("/crearProductos", HandlerProducto);
ProductoRouter.put("/actualizar/:id", HadlerActualizar);
ProductoRouter.delete("/eliminar/:id", HandlerEliminar);

module.exports = ProductoRouter;
