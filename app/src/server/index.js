const app = require('./server');
const db = require('../database/index');


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('Servidor Corriendo');
	db();
});
