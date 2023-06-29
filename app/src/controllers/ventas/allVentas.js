const Ventas = require('../../models/ventas');

const allVentas  = async () => {
  try {
    const VentasDB = await Ventas.find();
        return VentasDB;
  } catch (error) {
    throw new Error('Error al guardar el usuario');
  }
};

const ventasActualizado = async (_id, despachado) => {
  // if (!_id ) throw new Error("Se necesita el Id para poder actualizar la venta");
  // if (_id.length < 24) throw new Error("El id proporcionado no existe");

  const resultado = await Ventas.findByIdAndUpdate(
    _id,{ $set: despachado },
    { new: true } // Esto devuelve el documento actualizado en lugar del antiguo
  );

  if (!resultado) throw new Error("La venta no pudo ser actualizado");

  return resultado;
};

module.exports = {allVentas, ventasActualizado};