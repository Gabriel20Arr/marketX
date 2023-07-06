const mercadopago = require('mercadopago');
require('dotenv').config()
const {productoActualizado} = require('./Productos/index.js');
const {enviarNotificacionPorCorreo} = require('./enviarCorreo.js')
const {UsuarioActualizado} = require('./Usuarios/usuarioActualizado.js');
const getUsuarioById = require('./Usuarios/usuariosById.js')
const allUsuario = require('./Usuarios/usuarios.js');
const crearVenta = require('./ventas/crearVenta.js');

const { KEYMERCADOPAGO, LOCALHOST, LOCALHOSTAPP } = process.env;
var body;
const createOrder = async (req, res) => {
    const { precio} = req.body; 
    
    body = req.body
    mercadopago.configure({
        access_token: KEYMERCADOPAGO
    })
    const result = await mercadopago.preferences.create({
        
        items: [
            {
                title: "Productos del carrito",
                currency_id: 'ARS',
                quantity: 1,
                unit_price: precio,
            }
        ],
        
        back_urls: {
            success: "https://marketx-production.up.railway.app/pago/success",
            failure: "https://marketx-production.up.railway.app/pago/failure",
            pending: "",
        },
        notification_url: 'https://011b-200-115-58-192.sa.ngrok.io/webhook'
    })
    
    return res.send(result.body)
}


const success = async(req, res) => {
    const {usuario, precio, cartItems} = body;
    const fecha = new Date();
    
    cartItems.forEach(async element => {
       await productoActualizado(element._id,{stock:element.stock-element.quantity})
       
       const usuarios = await allUsuario();
       const vendedor = usuarios.find(use =>use.correo === element.categorias[0]);
       
       const venta = {
           monto: element.precio * (element.quantity),
           valor: element.precio,
           fecha, vendedor,
        //    comprador:usuario
           comprador:usuario, producto: element.titulo, cantidad: element.quantity
        }
       
       await UsuarioActualizado(vendedor._id,{vendido:[...vendedor.vendido,venta]});
       await crearVenta(venta);
    });


    const user = await getUsuarioById(usuario._id)
    
    cartItems.forEach( async (elem) => {
        const object = {valor: (elem.precio * elem.quantity), fecha, producto: elem._id};

        // await UsuarioActualizado(usuario._id, {comprado:[...user.comprado,object]})
        await UsuarioActualizado(usuario._id, {comprado:[...user.comprado,object],carrito:[]})
    } )

    const asunto = "La compra ha sido exitosa";
    const mensaje = `Estimado ${usuario.nombre}, ¡Es un placer escribirte para agradecerte por tu reciente compra en MarketX! Queremos felicitarte por haber completado con éxito tu transacción y por elegirnos como tu plataforma de compras de confianza. Nos complace informarte que tu compra ha sido procesada correctamente y que pronto recibirás tus productos en la dirección de envío proporcionada. Nos aseguraremos de que tu pedido sea entregado de manera segura y dentro de los plazos estimados. Queremos recordarte que en MarketX nos esforzamos por ofrecer solo productos de alta calidad y de las mejores marcas del mercado. Cada artículo es cuidadosamente seleccionado para garantizar que nuestros clientes disfruten de una experiencia satisfactoria y duradera. Si en algún momento tienes alguna pregunta o inquietud relacionada con tu compra, nuestro equipo de atención al cliente estará encantado de ayudarte. Puedes comunicarte con nosotros a través del correo electrónico atcliente.marketX@gmail.com. Estamos aquí para brindarte la asistencia que necesitas. Una vez más, queremos agradecerte por tu confianza en MarketX. Esperamos que disfrutes plenamente de tu nuevo producto y que te brinde muchas horas de diversión y entretenimiento. Tu satisfacción es nuestra máxima prioridad, y estamos comprometidos en brindarte una experiencia de compra excepcional. Esperamos verte pronto para tu próxima compra. ¡Que disfrutes de tu producto al máximo! Atentamente, MarketX.`;
    // console.log(usuario.correo);
    await enviarNotificacionPorCorreo(usuario.correo, asunto, mensaje)
    res.redirect("https://marketx-doploy.vercel.app/home");
};

const failure = (req, res) => {
    res.redirect("https://marketx-doploy.vercel.app/failure");
};

const webhook = async (req, res) => {
    try {
        const paymentId = req.query["data.id"];

        if (req.query.type === "payment" && paymentId) {
            const data = await mercadopago.payment.findById(paymentId);
            console.log("Payment data:", data);
            console.log("Compra realizada correctamente");
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
    }
}

module.exports = {createOrder, success, webhook, failure}