const Ventas = require('../../models/ventas');

const allVentas  = async () => {
  try {
    const VentasDB = await Ventas.find();
        return VentasDB;
  } catch (error) {
    throw new Error('Error al guardar el usuario');
  }
};

module.exports = allVentas;