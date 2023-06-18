const { productoId } = require("./ProductoPorId");
const { allProductos } = require("./allProductos");
const { eliminarProducto } = require("./eliminarProducto");
const { productoActualizado } = require("./productoActualizado");
const { productoCreado } = require("./productosCreado");
const {createProduct} = require('./createProduct');

module.exports = {
  productoActualizado,
  productoCreado,
  productoId,
  allProductos,
  eliminarProducto,
  createProduct
};
