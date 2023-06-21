const Usuario = require('../../models/Usuario');

const usuarioCarrito = async (id,id_producto,id_delete)=>{
    const usuarioDB = await Usuario.findById(id);
    if(id_producto)usuarioDB.carrito.push(id_producto)
    else{usuarioDB.carrito = usuarioDB.carrito.filter(producto => producto==id_delete)};
    delete usuarioDB._id;

    const resultado = await Usuario.findByIdAndUpdate(
        id,{ $set:usuarioDB },
        { new: true } 
    );

    return resultado;
}

module.exports = usuarioCarrito;