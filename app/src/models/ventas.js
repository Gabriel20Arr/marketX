const {Schema, model} = require('mongoose');
const { Usuario, Producto } = require("./models")

const VentaSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    valorTotal: Number,
    cliente: {
        type: Schema.Types.ObjectId,
        ref : "Usuario"
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: "Producto"
    }
})

module.exports = model('Venta', VentaSchema)