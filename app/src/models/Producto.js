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
		maxlength: [400, 'Se esta excediendo la longitud maxima de 400 caracteres'],
	},
	precio: {
		type: Number,
		required: true,
	},
	cantidadVenta: {
		type: Number,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: Usuario,
	},
	stock: {
		type: Number,
		require: true,
	},
	categorias: {
		type: Array,
		default: [],
	},
	accion: {
		type: Boolean,
		default: true
	},
	puntuaciones: {
		type: Array,
		default: []
	}
});

module.exports = model('Producto', ProductoSchema);
