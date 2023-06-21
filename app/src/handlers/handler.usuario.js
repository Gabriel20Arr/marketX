const createUser = require("../controllers/Usuarios/createUser");
const allUsuario = require("../controllers/Usuarios/usuarios");
const getUsuarioById = require('../controllers/Usuarios/usuariosById');
const usuarioCarrito = require('../controllers/Usuarios/usuarioCarrito');

const HandlerCrearUsuario = async(req, res) => {
    const user = req.body;
    try {
        const result = await createUser(user);
        res.status(200).json({message:result})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const HandlerAllUsuarios = async (req, res) => {
    try {
        const ress = await allUsuario()
        res.status(200).json(ress);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const HandlerUserById = async(req, res) =>{
    const {id} = req.params;
    try {
        const result = await getUsuarioById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const HandlerUserCar = async(req, res) =>{
    const {idUsuario, idProducto, idProductoDelete} = req.body;
    try {
        const result = await usuarioCarrito(idUsuario,idProducto,idProductoDelete);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


module.exports = { HandlerCrearUsuario, HandlerAllUsuarios, HandlerUserById, HandlerUserCar }