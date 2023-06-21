const { Router } = require('express');
const router = Router();

const ProductoRouter = require('./Producto.routes')
const UsuarioRouter = require('./Usuario.routes');
const CorreoRouter = require('./Notificaciones.router');

router.use("/Producto", ProductoRouter);

router.use("/Usuario", UsuarioRouter);

router.use('/notificaciones', CorreoRouter);

module.exports = router;