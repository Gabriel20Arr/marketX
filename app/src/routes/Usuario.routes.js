const { Router } = require("express");

const {HandlerCrearUsuario, HandlerAllUsuarios, HandlerUserById, HandlerUserCar} = require("../handlers/handler.usuario");

const UsuarioRouter = Router();

UsuarioRouter.post("/", HandlerCrearUsuario);

UsuarioRouter.get("/", HandlerAllUsuarios);

UsuarioRouter.get("/:id", HandlerUserById);

UsuarioRouter.put("/", HandlerUserCar);

// UsuarioRouter.post("/", () => {});

module.exports = UsuarioRouter;