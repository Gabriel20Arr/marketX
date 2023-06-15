const {
  allProductos,
  productoId,
  productoActualizado,
  productoCreado,
  eliminarProducto,
} = require("../controllers/Productos/index");

//------------Traer todos los Productos------------------>

const HandlerAllProductos = async (req, res) => {
  try {
    const ress = await allProductos();

    res.status(200).json(ress);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//-------------Traer los Productos por Id---------------------->

const HandlerIdProductos = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await productoId(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    const cleanProducto = {
      titulo: producto.titulo,
      categoria: producto.categoria,
      imagen: producto.imagen,
      precio: producto.precio,
    };
    res.status(200).json(cleanProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-------------Crear Productos--------------------------------->

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

//--------------------Actualizar Producto --------------------------->

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

//-------------------------Eliminar Producto -------------------------->

const HandlerEliminar = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      throw new Error("Se necesita el Id para poder eliminar un Producto");
    if (id.length !== 24) throw new Error("El id proporcionado no es válido");

    const eliminar = await eliminarProducto(id);
    res.status(204).send("Se elimino con exito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  HandlerProducto,
  HandlerAllProductos,
  HadlerActualizar,
  HandlerEliminar,
  HandlerIdProductos,
};
