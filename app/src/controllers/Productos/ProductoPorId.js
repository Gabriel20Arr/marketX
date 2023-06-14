const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');


const buscarProductoPorId = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id)
            .populate({
                select: 'nombre',
                model: Categoria,
            })
            .exec();

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
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

module.exports = buscarProductoPorId;