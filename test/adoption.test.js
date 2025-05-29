import supertest from "supertest";
import  assert  from "assert";
import mongoose from "mongoose";

import Adoption from "../src/dao/Adoption.js";
import User from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";


mongoose.connect(`mongodb+srv://emipereiro:Salu1805@cluster0.avxgn.mongodb.net/Backend3Final?retryWrites=true&w=majority&appName=Cluster0`)

const requester = supertest("http://localhost:8080");

describe("test dao usuarios", function() {
      this.timeout(5000);
      before(function(){
          this.adoptionDao = new Adoption()
          this.userDao = new User();
          this.petDao = new Pet();
      })
  
      beforeEach(async function () {
        await mongoose.connection.collections.adoptions.drop().catch(() => {});
        await mongoose.connection.collections.users.drop().catch(() => {});
        await mongoose.connection.collections.pets.drop().catch(() => {});
      });
  
   
      it("el get de adopciones, retorna un array", async function(){
        const resultado = await this.adoptionDao.get();
        assert.strictEqual(Array.isArray(resultado), true);
    })
after(async function (){
          await mongoose.disconnect();
      })
  })



