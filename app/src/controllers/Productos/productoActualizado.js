const Producto = require("../../models/Producto");

const productoActualizado = async (id,datosModificados) => {
  if (!id ) throw new Error("Se necesita el Id para poder actualizar un Producto");
  if (id.length < 24) throw new Error("El id proporcionado no existe");

  const resultado = await Producto.findByIdAndUpdate(
    id,{ $set: datosModificados },
    { new: true } // Esto devuelve el documento actualizado en lugar del antiguo
  );

  if (!resultado) throw new Error("El producto no pudo ser actualizado");

  return resultado;
};

module.exports = { productoActualizado };
