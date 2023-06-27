const db = require("../../database/index");
const Usuario = require("../../models/Usuario");
const categorias = require('../../models/Categoria');

const createUser = async ({ nombre, correo, contraseña, provincia, codigo_postal, direccion, telefono, rol }) => {
  
  if (!nombre || !correo || !contraseña ) {
    throw new Error("Faltan datos");
  }
  // console.log(rol);

  await db();

  try {
    // const usuario = new Usuario({ nombre, correo, contraseña, rol, provincia, codigo_postal, direccion, telefono });

    let usuario;
    
    if (rol === "admin") {
      usuario = new Usuario({ nombre, correo, contraseña, rol, provincia, codigo_postal, direccion, telefono  });
    } else {
      usuario = new Usuario({ nombre, correo, contraseña, provincia, codigo_postal, direccion, telefono  });
    }

    console.log(usuario);

    const savedUser = await usuario.save();
    const categoria = new categorias({nombre:correo});
    await categoria.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error al guardar el usuario");
  }
};

module.exports = createUser;