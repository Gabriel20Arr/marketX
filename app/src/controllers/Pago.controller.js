const mercadopago = require('mercadopago');
require('dotenv').config()

const { KEYMERCADOPAGO } = process.env;

const createOrder = async (req, res) => {
    console.log("SHOW ",req.body);
    
    const { precio } = req.body; 
    
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

    console.log(result);

    return res.send(result.body)
}


const success = (req, res) => {
  res.redirect('http://localhost:3000/home');
};

const failure = (req, res) => {
  res.send("HOLA MUNDOOO")
};

const webhook = async (req, res) => {
    const payment = req.query;

    try {
        if(payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        // console.log(data);
        }
        
        res.sendStatus(204)  
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({error: error.message})        
    }

}

module.exports = {createOrder, success, webhook, failure}