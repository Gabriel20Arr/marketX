const Producto = require("../../models/Producto");
const productoCreado = async (
  titulo,
  categoria,
  imagen,
  descripcion,
  precio,
  cantidadVenta,
  usuario,
  categorias
) => {
  const nuevoProducto = new Producto({
    titulo,
    categoria,
    imagen,
    descripcion,
    precio,
    cantidadVenta,
    usuario,
    categorias
  });

  nuevoProducto.save();
};

module.exports = { productoCreado };
