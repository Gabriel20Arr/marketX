const db = require("../../database/index");
const Usuario = require("../../models/Usuario");
const categorias = require('../../models/Categoria');

const createUser = async ({ nombre, correo, contraseña, rol }) => {
  if (!nombre || !correo || !contraseña) {
    throw new Error("Faltan datos");
  }

  await db();

  try {
    let usuario;

    if (rol === "admin") {
      usuario = new Usuario({ nombre, correo, contraseña, rol });
    } else {
      usuario = new Usuario({ nombre, correo, contraseña });
    }

    const savedUser = await usuario.save();
    const categoria = new categorias({nombre:correo});
    await categoria.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error al guardar el usuario");
  }
};

module.exports = createUser;