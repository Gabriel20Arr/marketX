const Usuario = require('../../models/Usuario');

const getUsuarioById = async (id) => {
  try {
    const usuarioDB = await Usuario.findById(id);
    if (usuarioDB) {
      return usuarioDB;
    } else {
      throw new Error('Usuario no existente');
    }
  } catch (error) {
    throw new Error('Error al obtener el usuario por ID');
  }
};

module.exports = getUsuarioById;