const { Router } = require("express");
const {HandlerEnviarCorreo} = require('../handlers/handler.notificacione');
const CorreoRouter = Router();

CorreoRouter.post("/", HandlerEnviarCorreo);

module.exports = CorreoRouter;