const {allVentas, ventasActualizado} = require('../controllers/ventas/allVentas');

const HandlerAllVentas = async(req, res) =>{
    try {
        const result = await allVentas();
        res.status(200).json({result});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const HandlerActualizar = async (req, res) => {
  const { _id, despachado} = req.body;
  try {
    await ventasActualizado(_id, despachado);
    res.status(200).send('Se actualizó correctamente');
  } catch (error) {
    res.status(422).send(error.message);
  }
};


module.exports= {HandlerAllVentas, HandlerActualizar};