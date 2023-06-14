const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes')

router.use("/Producto", ProductoRouter)

router.use("/Usuario", (req, res) => {
    res.send(console.log("Prueba Usuario rutas"))
})

module.exports = router;