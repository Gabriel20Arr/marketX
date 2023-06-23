const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes')
const routerPago = require('./Pago.routes')
const UsuarioRouter = require('./Usuario.routes');
const CorreoRouter = require('./Notificaciones.router');

router.use("/Producto", ProductoRouter);

router.use("/Usuario", UsuarioRouter);

router.use("/pago", routerPago);
router.use('/notificaciones', CorreoRouter);

module.exports = router;