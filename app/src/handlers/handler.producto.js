const {
  allProductos,
  productoId,
  productoActualizado,
  eliminarProducto,
  createProduct,
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
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-------------Crear Productos--------------------------------->

const HandlerProducto = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const result = await createProduct(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({messaje:error.message});
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
  HandlerIdProductos
};
