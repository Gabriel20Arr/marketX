const { Router } = require("express");

const {HandlerCrearUsuario} = require("../handlers/handler.usuario");

const UsuarioRouter = Router();

UsuarioRouter.post("/", HandlerCrearUsuario);

UsuarioRouter.get("/", () => {});

// UsuarioRouter.post("/", () => {});

module.exports = UsuarioRouter;