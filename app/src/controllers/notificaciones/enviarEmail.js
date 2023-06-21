const nodemailer = require('nodemailer');
require("dotenv").config();

const enviarCorreo = async ({correo, asunto, mensaje}) => {
  // Configurar el transportador de correo electrónico
  const { email } = process.env;
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bb7b204b94f746",
      pass: "8c9111b14e029a"
    }
  });

  // Configurar los datos del correo electrónico
  const mailOptions = {
    from: email,
    to: correo,
    subject: asunto,
    html: `<b>${mensaje}</b>`,
  };

  try {
    // Enviar el correo electrónico
    const enviado = await transporter.sendMail(mailOptions);
    return 'se ha enviado correctamente la notificación';
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Error al enviar el correo electrónico');
  }
};

module.exports = {enviarCorreo};