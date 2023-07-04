const axios =  require('axios');

const enviarNotificacionPorCorreo = async (correo, asunto, mensaje) => {
  const notificación = {correo, asunto, mensaje};

  const result =  axios.post("https://marketx-production.up.railway.app/notificaciones", notificación)
  .then(result=>result.data).catch(error=>error)

  return result;
};

module.exports = { enviarNotificacionPorCorreo }

  