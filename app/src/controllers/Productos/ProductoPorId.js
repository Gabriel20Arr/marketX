const Producto = require("../../models/Producto");

const productoId = async (id) => {
  const producto = await Producto.findById(id);

  return producto;
};

module.exports = { productoId };
