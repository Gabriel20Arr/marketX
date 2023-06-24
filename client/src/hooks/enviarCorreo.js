const axios =  require('axios');

const enviarNotificacionPorCorreo = async (correo, asunto, mensaje) => {
  const notificación = {correo, asunto, mensaje};

  const result =  axios.post('http://localhost:3001/notificaciones', notificación)
  .then(data=>data).catch(error=>error)

  return result;
};

module.exports = { enviarNotificacionPorCorreo }

  