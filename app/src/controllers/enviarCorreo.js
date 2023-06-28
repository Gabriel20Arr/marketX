const axios =  require('axios');

const enviarNotificacionPorCorreo = async (correo, asunto, mensaje) => {
  const notificación = {correo, asunto, mensaje};

  const result =  axios.post('/notificaciones', notificación)
  .then(result=>result.data).catch(error=>error)

  return result;
};

module.exports = { enviarNotificacionPorCorreo }

  