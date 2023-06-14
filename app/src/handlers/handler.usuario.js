const createUser = require("../controllers/createUser");

const HandlerCrearUsuario = async(req, res) => {
    const user = req.body;
    try {
        const result = await createUser(user);
        res.status(200).json({message:result})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



module.exports = { HandlerCrearUsuario }