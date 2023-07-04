const Ventas = require('../../models/ventas');

const crearVenta = async({vendedor, comprador, monto, fecha, producto, cantidad})=>{
    const venta = new Ventas({vendedor, comprador, monto, fecha, cantidad, producto});
    const ventaCreado = await venta.save();
    return ventaCreado;
};

module.exports = crearVenta;