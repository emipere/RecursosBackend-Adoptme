import MockingService from "../services/mocking.js";
import UserModel from "../dao/models/User.js";
import PetModel from "../dao/models/Pet.js";


const crearMascotas = async (req, res) => {
    try {
        const pets = await MockingService.generarMascotasMocking(70);
        res.status(200).send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

 const crearUsuarios = async (req, res) => {
    try {
        const users = await MockingService.generarUsuariosMocking(50);
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};    

   const generarDatos = async (req, res) => {
    const { users, pets } = req.body; 
    console.log ("Los datos Recibidos son ", {users, pets});
    try {
    
        const usuarios = await MockingService.generarUsuariosMocking(users);
        const mascotas = await MockingService.generarMascotasMocking(pets);

    
        const usuariosInsertados = await UserModel.insertMany(usuarios);
        const mascotasInsertadas = await PetModel.insertMany(mascotas);

        res.json({
            status: "success",
            message: "Datos generados e insertados correctamente",
            usuariosInsertados: usuariosInsertados.length,
            mascotasInsertadas: mascotasInsertadas.length,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export default {
    crearMascotas ,
    crearUsuarios ,
    generarDatos      
};
