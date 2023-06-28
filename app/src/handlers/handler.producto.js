const uploadImage = require('../cloudinary/index');

const {
	allProductos,
	productoId,
	productoActualizado,
	productoCreado,
	eliminarProducto,
	ProductByUser,
} = require('../controllers/Productos/index');

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
  let { titulo, categoria, imagen, descripcion, precio, cantidadVenta, usuario, categorias, stock } =
    req.body;
  try {
    // if (!titulo || !categoria || !imagen || !descripcion || !precio || !usuario || !stock)
    //   throw new Error(
    //     "Se necesita tener todo los campos completos para crear un Producto"
    //   );

    console.log(req.files);

    if (req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath);
      imagen = result.secure_url;
    }

    const nuevoProducto = await productoCreado(
      titulo,
      categoria,
      imagen,
      descripcion,
      precio,
      cantidadVenta,
      usuario,
      categorias,
      stock
    );
    console.log(nuevoProducto);
    res.status(201).send("Se creo con exito el Producto");
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

//--------------------Actualizar Producto --------------------------->

const HadlerActualizar = async (req, res) => {
	const { _id } = req.body;
	delete req.body._id;
	try {
		await productoActualizado(_id, req.body);
		res.status(200).send('Se actualizó correctamente');
	} catch (error) {
		res.status(422).send(error.message);
	}
};

//-------------------------Eliminar Producto -------------------------->

const HandlerEliminar = async (req, res) => {
	const { id } = req.params;
	try {
		if (!id)
			throw new Error('Se necesita el Id para poder eliminar un Producto');
		if (id.length !== 24) throw new Error('El id proporcionado no es válido');

		const eliminar = await eliminarProducto(id);
		res.status(204).send('Se elimino con exito');
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//--------------------------Productos por usuario -------------------------------->

const HandlerProductUsers = async (req, res) => {
	try {
		const result = await ProductByUser();
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	HandlerProducto,
	HandlerAllProductos,
	HadlerActualizar,
	HandlerEliminar,
	HandlerIdProductos,
	HandlerProductUsers,
};
