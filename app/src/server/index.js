const app = require('./server');
const db = require('../database/index');
require('dotenv').config()

const { PORT } = process.env

app.listen(PORT, () => {
	console.log('Servidor Corriendo');
	db();
});
