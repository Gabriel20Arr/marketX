const Producto = require("../../models/Producto");
const productoCreado = async (
  titulo,
  categoria,
  imagen,
  descripcion,
  precio,
  cantidadVenta,
  usuario,
  categorias,
  stock
) => {
  const nuevoProducto = new Producto({
    titulo,
    categoria,
    imagen,
    descripcion,
    precio,
    cantidadVenta,
    usuario,
    categorias,
    stock
  });

  nuevoProducto.save();
};

module.exports = { productoCreado };
