const app = require('./server');
const db = require('../database/index');
require('dotenv').config()

const { PORT } = process.env

app.listen(PORT || 3001, () => {
	console.log('Servidor Corriendo');
	db();
});
