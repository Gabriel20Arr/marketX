const mercadopago = require('mercadopago');
require('dotenv').config()
const {productoActualizado} = require('./Productos/index.js');
const {enviarNotificacionPorCorreo} = require('./enviarCorreo.js')
const {UsuarioActualizado} = require('./Usuarios/usuarioActualizado.js');
const getUsuarioById = require('./Usuarios/usuariosById.js')
const allUsuario = require('./Usuarios/usuarios.js');
const crearVenta = require('./ventas/crearVenta.js');

const { KEYMERCADOPAGO, LOCALHOST } = process.env;
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
            success: `https://marketx-production.up.railway.app/pago/success`,
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
           comprador:usuario
        }
       
       await UsuarioActualizado(vendedor._id,{vendido:[...vendedor.vendido,venta]});
       await crearVenta(venta);
    });


    const user = await getUsuarioById(usuario._id)
    
    cartItems.forEach( async (elem) => {
        const object = {valor: (elem.precio * elem.quantity), fecha, producto: elem._id};

        await UsuarioActualizado(usuario._id, {comprado:[...user.comprado,object]})
    } )

    const asunto = "Mercado Pago";
    const mensaje = "Su compra se realizó correctamente";
    console.log(usuario.correo);
    await enviarNotificacionPorCorreo(usuario.correo, asunto, mensaje)
    res.redirect(`${LOCALHOST}/home`);
};

const failure = (req, res) => {
    res.redirect(`${LOCALHOST}/failure`);
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