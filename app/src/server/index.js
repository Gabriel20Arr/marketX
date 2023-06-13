const app = require("./server");
const db = require("../database/index");

app.listen(3001, () => {
  console.log("Servidor Corriendo");
  db();
});
