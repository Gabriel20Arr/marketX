const { Schema, model } = require('mongoose');
const Usuario = require('./Usuario');

const ProductoSchema = new Schema({
	titulo: {
		type: String,
		required: true,
	},
	categoria: {
		type: String,
		enum: ['Placas de Video', 'Motherboard', 'Procesadores'],
		required: true,
	},

	imagen: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		require: true,
		minlength: [30, 'No se cumple la longitud minima de 30 caracteres'],
		maxlength: [255, 'Se esta excediendo la longitud maxima de 400 caracteres'],
	},
	precio: {
		type: Number,
		required: true,
	},
	cantidadVenta: {
		type: String,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: Usuario,
	},
<<<<<<< HEAD
	stock: {
		type: Number,
		require: true,
=======
	categorias: {
		type: Array,
		default:[]
>>>>>>> 0c2cd85e7bea89d1d559dadbb9eeb8bfe7efb3e6
	}
});

module.exports = model('Producto', ProductoSchema);
