const { Router } = require("express");

const {HandlerCrearUsuario, HandlerAllUsuarios, HandlerUserById} = require("../handlers/handler.usuario");

const UsuarioRouter = Router();

UsuarioRouter.post("/", HandlerCrearUsuario);

UsuarioRouter.get("/", HandlerAllUsuarios);

UsuarioRouter.get("/:id", HandlerUserById);

// UsuarioRouter.post("/", () => {});

module.exports = UsuarioRouter;