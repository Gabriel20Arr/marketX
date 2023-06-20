const Producto = require("../../models/Producto");
const productosApi = require('../../../../client/src/api/api');

const productoId = async (id) => {
    const existe= productosApi.find(producto=>producto.id==id)
  try {
    if (existe) {
        return existe
    }
    const productoDB = await Producto.findById(id);
    if (productoDB) {
      return productoDB;
    } else {
      throw new Error('Producto no existente');
    }
  } catch (error) {
    throw new Error('Error al obtener el producto por ID');
  }
};

module.exports = {productoId};
