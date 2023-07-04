const axios = require("axios");

const enviarNotificacionPorCorreo = async (correo, asunto, mensaje) => {
	const notificación = { correo, asunto, mensaje };

	try {
		const response = await axios.post(
			'https://marketx-production.up.railway.app/notificaciones',
			notificación
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

module.exports = { enviarNotificacionPorCorreo };
