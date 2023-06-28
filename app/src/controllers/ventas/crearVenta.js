const Ventas = require('../../models/ventas');

const crearVenta = async({vendedor, comprador, monto, fecha})=>{
    const venta = new Ventas({vendedor, comprador, monto, fecha});
    const ventaCreado = await venta.save();
    return ventaCreado;
};

module.exports = crearVenta;