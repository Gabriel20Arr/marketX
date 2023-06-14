const { Router } = require("express");

const {HandlerCrearUsuario, HandlerAllUsuarios} = require("../handlers/handler.usuario");

const UsuarioRouter = Router();

UsuarioRouter.post("/", HandlerCrearUsuario);

UsuarioRouter.get("/", HandlerAllUsuarios);

// UsuarioRouter.post("/", () => {});

module.exports = UsuarioRouter;