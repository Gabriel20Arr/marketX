const { Router } = require("express");

const {
  HandlerProducto, HandlerAllProductos
} = require("../handlers/handler.producto");

const ProductoRouter = Router();

ProductoRouter.post("/", HandlerProducto);

ProductoRouter.get("/", HandlerAllProductos);

// ProductoRouter.get("/:id", () => {});


module.exports = ProductoRouter;