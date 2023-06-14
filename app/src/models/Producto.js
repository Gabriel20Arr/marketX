const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: Text,
        required: false
    },
    precio: {
        type: String,
        required: true
    },
    cantidadVenta: {
        type: String,
    }
})

module.exports = model('Producto', ProductoSchema)