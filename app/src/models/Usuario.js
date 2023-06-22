// const { Schema, model } = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UsuarioSchema = new Schema(
//   {
//     nombre: {
//       type: String,
//       required: true,
//     },
//     correo: {
//       type: String,
//       required: true,
//     },
//     contraseña: {
//       type: String,
//       required: true,
//     },
//     rol: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // encryptamos la contraseña
// UsuarioSchema.method.encrypPassword = async (contraseña) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(contraseña, salt);
// };

// // comparamos la contraseña encryptada con la que recibimos
// UsuarioSchema.method.matchPassword = async function (contraseña) {
//   await bcrypt.compare(contraseña, this.contraseña);
// };

// module.exports = model("Usuario", UsuarioSchema);

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
    provincia: {
      type: String,
      require: true
    },
    codigo_postal: {
      type: Number,
      require: true
    },
    direccion: {
      type: String,
      require: true
    },
    telefono: {
      type: Number,
      require: true
    },
    carrito:{
      type: Array,
      default:[]
    }
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
