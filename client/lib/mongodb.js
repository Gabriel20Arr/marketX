const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En modo de desarrollo, utilizamos una variable global para preservar el valor
  // a través de las recargas de módulos causadas por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En modo de producción, es mejor no utilizar una variable global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exportamos una promesa del MongoClient con alcance de módulo. Al hacerlo en un
// módulo separado, el cliente puede ser compartido entre funciones.
module.exports = clientPromise;
