import mongoose from "mongoose";
import  {expect} from "chai";


import  User  from "../src/dao/Users.dao.js";



mongoose.connect(`mongodb+srv://emipereiro:Salu1805@cluster0.avxgn.mongodb.net/Backend3Final?retryWrites=true&w=majority&appName=Cluster0`)

describe("Testeamos el dao de usuarios", function () {
     
    before(function () {
        this.userDao = new User()
    })
    
    this.beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
        this.timeout(10000);
    })

    it("Testeo y el get me retorna un array", async function () {
        const resultado = await this.userDao.get();
        expect(Array.isArray(resultado)).to.be.true;
   }) 

    it("el dao agrega correctamente un elemento en la BD", async function () {
        let usuario = {
            first_name: "Ema",
            last_name: "Pere",
            email: "ema@pere.com",
            password: "123456",
        }

        const resultado = await this.userDao.save(usuario);
        expect(resultado).to.have.property("_id");
    })

    it("al agregar un usuario nuevo, se tiene que crear con un arreglo de mascotas vacio por defecto", async function () {
        let usuario = {
            first_name: "Ema",
            last_name: "Pere",
            email: "ema@pere.com",
            password: "123456",
        }
        const resultado = await this.userDao.save(usuario);
        expect(resultado.pets).to.deep.equal([]);
    })

    it(" el dao puede obtener un usuario por email", async function () {
        let usuario = {
            first_name: "Ema",
            last_name: "Pere",
            email: "ema@pere.com",
            password: "123456", 
        }
        await this.userDao.save(usuario);
        const user = await this.userDao.getBy({ email: usuario.email });
        expect(user).to.be.an("object");
    })

   after(async function () {
    await mongoose.disconnect();
   })

})