const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes');
const routerPago = require('./Pago.routes');
const UsuarioRouter = require('./Usuario.routes');
const CorreoRouter = require('./Notificaciones.router');
const VentasRouter = require('./Ventas.router');

router.use('/Producto', ProductoRouter);

router.use('/Usuario', UsuarioRouter);

router.use('/pago', routerPago);
router.use('/notificaciones', CorreoRouter);
router.use('/ventas', VentasRouter);

module.exports = router;
