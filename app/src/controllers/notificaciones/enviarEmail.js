const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const accountTransport = require('../../../accont_transport.json');

const enviarCorreo = async ({ correo, asunto, mensaje }) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    "https://developers.google.com/oauthplayground"
  );
  
  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false
    }
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: accountTransport.auth.user,
      clientId: accountTransport.auth.clientId,
      clientSecret: accountTransport.auth.clientSecret,
      refreshToken: accountTransport.auth.refreshToken,
      accessToken: accessToken
    }
  });

  const mailOptions = {
    from: accountTransport.auth.user,
    to: correo,
    subject: asunto,
    text: mensaje
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente:', info);
    return 'Correo enviado exitosamente';
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Error al enviar el correo electrónico');
  }
};

module.exports = { enviarCorreo };
