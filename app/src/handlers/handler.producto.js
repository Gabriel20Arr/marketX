const { allProductos } = require("../controllers/Productos/allProductos");
const { productoCreado } = require("../controllers/Productos/productosCreado");
const {
  productoActualizado,
} = require("../controllers/Productos/productoActualizado");
const {
  eliminarProducto,
} = require("../controllers/Productos/eliminarProducto");
const HandlerAllProductos = async (req, res) => {
  try {
    const ress = await allProductos();

    res.status(200).json(ress);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const HandlerProducto = async (req, res) => {
  const { titulo, categoria, imagen, descripcion, precio, cantidadVenta } =
    req.body;
  try {
    if (!titulo || !categoria || !imagen || !descripcion || !precio)
      throw new Error(
        "Se necesita tener todo los campos completos para crear un Producto"
      );
    const nuevoProducto = await productoCreado(
      titulo,
      categoria,
      imagen,
      descripcion,
      precio,
      cantidadVenta
    );
    res.status(201).send("Se creo con exito el Producto");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const HadlerActualizar = async (req, res) => {
  const { id, titulo, categoria, imagen, descripcion, precio, cantidadVenta } =
    req.body;
  try {
    if (!id)
      throw new Error("Se necesita el Id para poder actualizar un Producto");
    if (id.length < 24) throw new Error("El id proporcionado no Existe");

    const actualizado = await productoActualizado(
      id,
      titulo,
      categoria,
      imagen,
      descripcion,
      precio,
      cantidadVenta
    );

    res.status(200).send("Se actualizó correctamente");
  } catch (error) {
    res.status(422).send(error.message);
  }
};

const HandlerEliminar = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      throw new Error("Se necesita el Id para poder eliminar un Producto");
    if (id.length < 24) throw new Error("El id proporcionado no Existe");

    const eliminar = await eliminarProducto(id);
    res.status(204).send("Producto eliminado correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  HandlerProducto,
  HandlerAllProductos,
  HadlerActualizar,
  HandlerEliminar,
};
