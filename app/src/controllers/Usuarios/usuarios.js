const Usuario = require('../../models/Usuario');

const allUsuario = async () => {
  try {
    const usuariosDB = await Usuario.find();
        if(usuariosDB) {
            return usuariosDB;
        } else {
            throw new Error('Usuario no existente');
        }
  } catch (error) {
    throw new Error('Error al guardar el usuario');
  }
};

module.exports = allUsuario;