const Producto = require("../../models/Producto");

const eliminarProducto = async (id) => {
  const productoEliminado = await Producto.deleteOne({ _id: id });

  return productoEliminado;
};

module.exports = { eliminarProducto };
