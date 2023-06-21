const Producto = require('../../models/Producto');
const productos = require('../../../../client/src/api/api');
const allProductos = async () => {
  try {
    const productoDB = await Producto.find();
    if(productoDB.length > 0) {
        const result =productoDB.map(producto => {
          const {_id,categoria,descripcion,imagen,precio,titulo}=producto;
          return {id:_id,categoria,descripcion,imagen,precio,titulo};
        })
        return result;
    } else {
        return console.log('Producto no existente');
    }

		if (productoDB.length > 0) {
			return productoDB;
		} else {
			return console.log('Producto no existente');
		}
	} catch (error) {
		throw new Error('Error al buscar el producto');
	}
};

module.exports = { allProductos };
