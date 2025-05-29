import supertest from "supertest";
import assert from "assert";
import mongoose from "mongoose";

import Adoption from "../src/dao/Adoption.js";
import User from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";

mongoose.connect(
  `mongodb+srv://emipereiro:Salu1805@cluster0.avxgn.mongodb.net/Backend3Final?retryWrites=true&w=majority&appName=Cluster0`
);

const requester = supertest("http://localhost:8080");

describe("test dao usuarios", function () {
  this.timeout(5000);
  before(function () {
    this.adoptionDao = new Adoption();
    this.userDao = new User();
    this.petDao = new Pet();
  });

  beforeEach(async function () {
    await mongoose.connection.collections.adoptions.drop().catch(() => {});
    await mongoose.connection.collections.users.drop().catch(() => {});
    await mongoose.connection.collections.pets.drop().catch(() => {});
  });

  it("el get de adopciones, retorna un array", async function () {
    const resultado = await this.adoptionDao.get();
    assert.strictEqual(Array.isArray(resultado), true);
  });

  it("Debe crear una adopción correctamente", async function () {
    const user = await this.userDao.save({
      first_name: "oscar",
      last_name: "poli",
      email: "oscar@poli.com",
      password: "1234",
      pets: [],
    });

    const pet = await this.petDao.save({
      name: "fed",
      specie: "dog",
      age: 8,
      adopted: false,
    });

    const adoption = await this.adoptionDao.save({
      owner: user._id,
      pet: pet._id,
    });

    assert.ok(adoption._id);
    assert.strictEqual(adoption.owner.toString(), user._id.toString());
    assert.strictEqual(adoption.pet.toString(), pet._id.toString());
  });

  it("Debe obtener una adopción por ID", async function () {
    const user = await this.userDao.save({
      first_name: "lili",
      last_name: "guli",
      email: "lili@guli.com",
      password: "1234",
      pets: [],
    });

    const pet = await this.petDao.save({
      name: "felipe",
      specie: "cat",
      age: 4,
      adopted: false,
    });

    const adopcionCreada = await this.adoptionDao.save({
      owner: user._id,
      pet: pet._id,
    });

    const resultado = await this.adoptionDao.getBy({ _id: adopcionCreada._id });
    assert.ok(resultado);
    assert.strictEqual(resultado._id.toString(), adopcionCreada._id.toString());
  });

  it("Este falla , comparo id diferentes", async function () {
    const user = await this.userDao.save({
      first_name: "falla",
      last_name: "seguro",
      email: "falla@test.com",
      password: "1234",
      pets: [],
    });

    const pet = await this.petDao.save({
      name: "rauli",
      specie: "dog",
      age: 2,
      adopted: false,
    });

    const adopcionCreada = await this.adoptionDao.save({
      owner: user._id,
      pet: pet._id,
    });

    assert.strictEqual(adopcionCreada._id.toString(), user._id.toString());
  });

  after(async function () {
    await mongoose.disconnect();
  });
});
