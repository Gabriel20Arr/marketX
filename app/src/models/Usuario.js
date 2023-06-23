

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

// encryptamos la contraseña
UsuarioSchema.methods.encryptPassword = async function (contraseña) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contraseña, salt);
};

// comparamos la contraseña encryptada con la que recibimos
UsuarioSchema.methods.matchPassword = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = model("Usuario", UsuarioSchema);
