const Usuario = require('../../models/Usuario');

const usuarioCarrito = async (usuario,cartItems)=>{
    const usuarioDB = await Usuario.findById(usuario);
    usuarioDB.carrito = cartItems;
    delete usuarioDB._id;

    const resultado = await Usuario.findByIdAndUpdate(
        usuario,{ $set:usuarioDB },
        { new: true } 
    );

    return resultado;
}

module.exports = usuarioCarrito;