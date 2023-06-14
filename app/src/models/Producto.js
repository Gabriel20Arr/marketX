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
        type: String,
        require: true,
        minlength: [30, "No se cumple la longitud minima de 30 caracteres"],
        maxlength: [400, "Se esta excediendo la longitud maxima de 400 caracteres"],
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