const Producto = require('../../models/Producto');

const allProductos = async () => {
  try {
    const productoDB = await Producto.find();
    
    if(productoDB.length > 0) {
        return productoDB;
    } else {
        return console.log('Producto no existente');
    }

  } catch (error) {
    throw new Error('Error al buscar el producto');
  }
};

module.exports = { allProductos };