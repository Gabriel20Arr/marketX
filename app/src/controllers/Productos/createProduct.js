const { productoCreado } = require('./productosCreado');

const createProduct = async({ titulo, categoria, imagen, descripcion, precio, cantidadVenta})=>{
    if (!titulo || !categoria || !imagen || !descripcion || !precio)
      throw new Error(
        "Se necesita tener todo los campos completos para crear un Producto"
      );
    await productoCreado(
      titulo,
      categoria,
      imagen,
      descripcion,
      precio,
      cantidadVenta
    );

    return "Se creo correctamente";
}

module.exports = {createProduct};