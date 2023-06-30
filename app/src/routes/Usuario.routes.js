const { Router } = require("express");

const {HandlerCrearUsuario, HandlerAllUsuarios, HandlerUserById, HandlerUserCar,HandlerEditUser} = require("../handlers/handler.usuario");

const UsuarioRouter = Router();

UsuarioRouter.post("/", HandlerCrearUsuario);

UsuarioRouter.get("/", HandlerAllUsuarios);

UsuarioRouter.get("/:id", HandlerUserById);

UsuarioRouter.put("/", HandlerUserCar);

UsuarioRouter.put("/editar", HandlerEditUser);

// UsuarioRouter.post("/", () => {});

module.exports = UsuarioRouter;