const validation = (form) => {
    let errors = {};

    if(!form.titulo) {
        errors.titulo = '(Campo obligatorio)';
    }
    if(form.titulo.length < 4 || form.titulo.length > 140) {
        errors.titulo = 'El título del producto debe tener entre 4 y 140 caracteres';
    }
    if(!form.imagen) {
        errors.imagen = '(Campo obligatorio)';
    }
    if(!form.categoria){
        errors.categoria = '(Campo obligatorio)';
    }
    if(!form.descripcion){
        errors.descripcion = '(Campo obligatorio)';
    }
    if(form.descripcion.length < 30 || form.descripcion.length > 400) {
        errors.descripcion = 'La descripción del producto debe tener entre 30 y 400 caracteres';
    }
    if(!form.precio){
        errors.precio = '(Campo obligatorio)';
    }
    
    return errors;
}

export default validation;