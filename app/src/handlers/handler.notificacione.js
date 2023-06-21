const {enviarCorreo} = require('../controllers/notificaciones/enviarEmail');

const HandlerEnviarCorreo = async (req, res) => {
    try {
      const ress = await enviarCorreo(req.body);
      res.status(200).json(ress);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  module.exports = {HandlerEnviarCorreo}