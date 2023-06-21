const mongoose = require("mongoose");
const Producto = require("./Producto");

// 1.definir el schema
const categorias = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
  );

//2.Definir el modelo
module.exports = mongoose.model("Categoria", categorias);
