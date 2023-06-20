const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes')
const UsuarioRouter = require('./Usuario.routes')

router.use("/Producto", ProductoRouter);

router.use("/Usuario", UsuarioRouter);

module.exports = router;