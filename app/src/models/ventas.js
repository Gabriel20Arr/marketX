const { Schema, model } = require("mongoose");

const VentaSchema = new Schema({
  vendedor: {
    type: Schema.Types.Mixed,
    required: true,
  },
  comprador: {
    type: Schema.Types.Mixed,
    required: true,
  },
  monto: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

module.exports = model("Ventas", VentaSchema);
