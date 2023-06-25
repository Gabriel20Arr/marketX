const { Router } = require("express");

const {
  HandlerAllProductos,
  HandlerIdProductos,
  HandlerProducto,
  HadlerActualizar,
  HandlerEliminar,
  HandlerProductUsers,
} = require("../handlers/handler.producto");

const ProductoRouter = Router();

ProductoRouter.get("/", HandlerAllProductos);
ProductoRouter.get('/usuario',HandlerProductUsers);
ProductoRouter.get("/:id", HandlerIdProductos);
ProductoRouter.post("/crearProductos", HandlerProducto);
ProductoRouter.put("/actualizar", HadlerActualizar);
ProductoRouter.delete("/eliminar/:id", HandlerEliminar);

module.exports = ProductoRouter;
