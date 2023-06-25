const allVentas = require('../controllers/ventas/allVentas');

const HandlerAllVentas = async(req, res) =>{
    try {
        const result = await allVentas();
        res.status(200).json({result});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports= {HandlerAllVentas};