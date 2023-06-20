export const validate = (input, users) => {
  const newError = {};

  const correos =
    users && users.map((user) => user.correo).includes(input.correo);

  const correo = /^[^\s@]+@[^\s@]+\.(com)$/i;
  const regexContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!input.nombre.length) {
    newError.nombre = "";
  } else if (input.nombre.length < 5 || input.nombre.length > 20) {
    newError.nombre = "El usuario debe tener entre 5 a 20 caracteres";
  } else if (/\s\s/.test(input.nombre)) {
    newError.nombre = "El usuario no debe tener dos espacios seguidos";
  } else {
    newError.nombre = ""; // Asignar cadena vacía cuando no hay error
  }

  if (input.correo === "") {
    newError.correo = "";
  } else if (!correo.test(input.correo)) {
    newError.correo = "Debe ser un correo válido";
  } else if (correos) {
    newError.correo = "Este correo ya está en uso";
  } else {
    newError.correo = "";
  }

  if (input.contraseña === "") {
    newError.contraseña = "";
  } else if (!regexContraseña.test(input.contraseña)) {
    newError.contraseña =
      "Debe tener al menos 8 caracteres de longitud, contener al menos una letra mayúscula ,contener al menos una letra minúscula y contener al menos un número.";
  } else {
    newError.contraseña = "";
  }

  if (input.confirme_su_contraseña === "") {
    newError.confirme_su_contraseña = "";
  } else if (input.confirme_su_contraseña !== input.contraseña) {
    newError.confirme_su_contraseña = "La contraseña no coincide";
  } else {
    newError.confirme_su_contraseña = "";
  }

  return newError;
};
