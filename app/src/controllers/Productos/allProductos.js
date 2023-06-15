const Producto = require('../../models/Producto');
const productos = require('../../../../client/Api/api');
const allProductos = async () => {
	try {
		//const productoDB = await Producto.find();
		const productoDB = productos;

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
