const Producto = require("../../models/Producto");
const Usuario = require("../../models/Usuario");
const productoCreado = async (
  titulo,
  categoria,
  imagen,
  descripcion,
  precio,
  cantidadVenta
) => {
  const usuario = await Usuario.findOne({});
  const nuevoProducto = new Producto({
    titulo,
    categoria,
    imagen,
    descripcion,
    precio,
    cantidadVenta,
    usuario: usuario._id,
  });
  console.log(usuario);

  nuevoProducto.save();
};

module.exports = { productoCreado };
