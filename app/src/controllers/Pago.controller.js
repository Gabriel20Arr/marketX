const mercadopago = require('mercadopago');

const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: 'TEST-5573342297173515-060809-5931e0c896c00a652adc937525513ce2-1393822223'
    })

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop hp",
                unit_price: 300,
                currency_id: "ARS",
                quantity: 1,
            }
        ],
        back_urls: {
            success: "http://localhost:3000/pago/routerPago/success",
            failure: "http://localhost:3000/pago/routerPagofailure",
            pending: "http://localhost:3000/pago/routerPagopending",
        },
        notification_url: 'https://011b-200-115-58-192.sa.ngrok.io/webhook'
    })

    // console.log(result);

    res.send(result.body)
}


const success = (req, res) => res.send('success')

const webhook = async (req, res) => {
    const payment = req.query;

    try {
        if(payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        console.log(data);
        }
        
        res.sendStatus(204)  
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({error: error.message})        
    }

}

module.exports = {createOrder, success, webhook}