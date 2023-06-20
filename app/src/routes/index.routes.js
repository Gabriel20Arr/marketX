const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes')
const UsuarioRouter = require('./Usuario.routes')
const routerPago = require('./Pago.routes')

router.use("/Producto", ProductoRouter);

router.use("/Usuario", UsuarioRouter);

router.use("/pago", routerPago);

module.exports = router;