const createUser = require("../controllers/Usuarios/createUser");
const allUsuario = require("../controllers/Usuarios/usuarios")

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


module.exports = { HandlerCrearUsuario, HandlerAllUsuarios }