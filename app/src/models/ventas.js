const {Schema, model} = require('mongoose');
const  Usuario  = require("./Usuario");
const Producto = require("./Producto")

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

module.exports = model('Ventas', VentaSchema)