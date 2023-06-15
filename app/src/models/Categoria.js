const mongoose = require("mongoose");
const Producto = require("./Producto");

// 1.definir el schema
const categorias = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    minlength: [5, "Minimo se requiere que el nombre posea 5 caracateres"],
  },
  descripcion: {
    type: String,
    require: true,
    minlength: [30, "No se cumple la longitud minima de 30 caracteres"],
    maxlength: [300, "Se esta excediendo la longitud maxima de 300 caracteres"],
  },
  Producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Producto,
  },
});

//2.Definir el modelo
module.exports = mongoose.model("Categoria", categorias);
