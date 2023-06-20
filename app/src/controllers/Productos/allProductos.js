const Producto = require('../../models/Producto');
const productos = require('../../../../client/Api/api');
const allProductos = async () => {
<<<<<<< HEAD
	try {
		//const productoDB = await Producto.find();
		const productoDB = productos;
=======
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
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257

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
