const createUser = require("../controllers/Usuarios/createUser");
const allUsuario = require("../controllers/Usuarios/usuarios");
const getUsuarioById = require('../controllers/Usuarios/usuariosById');
// const eliminarUsuario = require("../controllers/Usuarios/deleteUser")

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


// const HandlerEliminar = async (req, res) => {
//     const { id } = req.params;
//     try {
//       if (!id)
//         throw new Error("Se necesita el Id para poder eliminar un Usuario");
//       if (id.length !== 24) throw new Error("El id proporcionado no es válido");
  
//       const eliminar = await eliminarUsuario(id);
//       res.status(204).send("Se elimino con exito");
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


module.exports = { HandlerCrearUsuario, HandlerAllUsuarios, HandlerUserById }