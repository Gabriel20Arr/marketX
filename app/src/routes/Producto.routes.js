const { Router } = require("express");

const {
  HandlerProducto,
} = require("../handlers/handler.producto");

const ProductoRouter = Router();

ProductoRouter.get("/", HandlerProducto);

// ProductoRouter.get("/:id", () => {});

// ProductoRouter.post("/", () => {});

module.exports = ProductoRouter;