const Usuario = require('../../models/Usuario');

// const usuarioCarrito = async (usuario,cartItems)=>{
//     const usuarioDB = await Usuario.findById(usuario);
//     usuarioDB.carrito = cartItems;
//     delete usuarioDB._id;

//     const resultado = await Usuario.findByIdAndUpdate(
//         usuario,{ $set:usuarioDB },
//         { new: true } 
//     );

//     return resultado;
// }

// module.exports = usuarioCarrito;
const Usuario = require('../../models/Usuario');

const usuarioCarrito = async (usuarioId, cartItems) => {
  try {
    const usuarioDB = await Usuario.findById(usuarioId);
    if (!usuarioDB) {
      throw new Error('Usuario no encontrado');
    }

    usuarioDB.carrito = cartItems;

    const resultado = await usuarioDB.save();
    return resultado;
  } catch (error) {
    throw new Error('Error al actualizar el carrito del usuario');
  }
};

module.exports = usuarioCarrito;