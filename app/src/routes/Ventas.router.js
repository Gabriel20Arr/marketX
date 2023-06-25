const {Router} = require("express");

const {HandlerAllVentas} = require("../handlers/handler.ventas");

const VentasRouter = Router();

VentasRouter.get("/", HandlerAllVentas);

module.exports = VentasRouter;