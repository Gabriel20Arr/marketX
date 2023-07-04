const validation = (form) => {
  let errors = {};

  if (!form.titulo) {
    errors.titulo = "*";
  }
  if (form.titulo.length < 4 || form.titulo.length > 40) {
    errors.titulo = "El título debe tener entre 4 y 40 caracteres";
  }
  if (!form.imagen) {
    errors.imagen = "*";
  }
  if (!form.categoria) {
    errors.categoria = "*";
  }
  if (form.descripcion.length < 1) {
    errors.descripcion = "*";
  }
  if (form.descripcion.length < 30 || form.descripcion.length > 400) {
    errors.descripcion = "La descripción debe tener entre 30 y 400 caracteres";
  }
  if (!form.precio) {
    errors.precio = "*";
  }
  if (!form.stock) {
    errors.precio = "*";
  }

  return errors;
};

export default validation;
