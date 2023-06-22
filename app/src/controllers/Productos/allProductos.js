const Producto = require('../../models/Producto');

const allProductos = async () => {
  try {
    const productoDB = await Producto.find();
    if(productoDB.length > 0) {
        const result =productoDB.map(producto => {
          const {_id,categoria,descripcion,imagen,precio,titulo, stock}=producto;
          return {id:_id,categoria,descripcion,imagen,precio,titulo, stock};
        })
        return result;
    } else {
        return console.log('Producto no existente');
    }

  } catch (error) {
    throw new Error('Error al buscar el producto');
  }
};

module.exports = { allProductos };