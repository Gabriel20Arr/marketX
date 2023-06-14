const mongoose = require("mongoose");

// 1.definir el schema
const categorias = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    minlength: 5,
  },
  descripcion: {
    type: String,
    require: true,
    minlength: 30,
    maxlength: 200,
  },
});

//2.Definir el modelo
module.exports = mongoose.model("Categoria", categorias);
