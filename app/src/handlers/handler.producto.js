const { allProductos } = require("../controllers/Productos/allProductos")

const HandlerProducto = (req, res) => {
    res.send("Prueba Producto rutas")
}

const HandlerAllProductos = async (req, res) => {
    try {
        const ress = await allProductos()
        
        res.status(200).json(ress);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = { HandlerProducto, HandlerAllProductos }