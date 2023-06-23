// const {useGetUsersQuery} = require("../../../client/src/redux/hooks/hooks")  
const {enviarNotificacionPorCorreo} = require('../../../client/src/hooks/enviarCorreo')
const mercadopago = require('mercadopago');
require('dotenv').config()

const { KEYMERCADOPAGO } = process.env;

const createOrder = async (req, res) => {
    const { precio, usuario } = req.body; 
    
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
            success: "http://localhost:3001/pago/success",
            failure: "http://localhost:3001/pago/failure",
            pending: "",
        },
        notification_url: 'https://011b-200-115-58-192.sa.ngrok.io/webhook'
    })

    // console.log("HOLAA ",result.status);

    return res.send(result.body)
}


const success = async (req, res) => {
    const {body} = req.query;
    
    // const asunto = "Mercado Pago";
    // const mensaje = "Su compra se realizó correctamente";
    // await  enviarNotificacionPorCorreo(body.correo, asunto, mensaje);
    
    res.redirect('http://localhost:3000/home');
};

const failure = (req, res) => {
  res.redirect('http://localhost:3000/failure');
};

const webhook = async (req, res) => {
    try {
        const paymentId = req.query["data.id"];

        if (req.query.type === "payment" && paymentId) {
            const data = await mercadopago.payment.findById(paymentId);
            console.log("Payment data:", data);
            alert("Compra realizada correctamente");
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message });
    }
}

module.exports = {createOrder, success, webhook, failure}