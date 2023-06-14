const db = require('../../database/index');
const Usuario = require('../../models/Usuario');

const createUser = async ({ nombre, correo, contraseña, rol }) => {
  if (!nombre || !correo || !contraseña ||!rol) {
    throw new Error('Faltan datos');
  }

  await db();

  try {
    const usuario = new Usuario({ nombre, correo, contraseña, rol });
    const savedUser = await usuario.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error al guardar el usuario');
  }
};

module.exports = createUser;
