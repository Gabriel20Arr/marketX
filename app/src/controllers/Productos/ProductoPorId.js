const Producto = require('../../models/Producto');

const productoId = async (id) => {
	try {
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

module.exports = { productoId };
