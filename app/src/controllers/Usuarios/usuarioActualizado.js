const Usuario = require("../../models/Usuario");

const UsuarioActualizado = async (id,datosModificados) => {
  if (!id ) throw new Error("Se necesita el Id para poder actualizar un Usuario");
  if (id.length < 24) throw new Error("El id proporcionado no existe");

  const resultado = await Usuario.findByIdAndUpdate(
    id,{ $set: datosModificados },
    { new: true } // Esto devuelve el documento actualizado en lugar del antiguo
  );

  if (!resultado) throw new Error("El producto no pudo ser actualizado");

  return resultado;
};

module.exports = {UsuarioActualizado };