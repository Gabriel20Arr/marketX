const {Router} = require("express");

const {HandlerAllVentas, HandlerActualizar} = require("../handlers/handler.ventas");

const VentasRouter = Router();

VentasRouter.get("/", HandlerAllVentas);
VentasRouter.put("/actualizar", HandlerActualizar);

module.exports = VentasRouter;