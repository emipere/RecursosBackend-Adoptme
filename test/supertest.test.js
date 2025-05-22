import supertest from "supertest";
import { expect } from "chai";


const  requester = supertest("http://localhost:8080");

describe("Testeo de la api de adopciones", function () {

    describe("Testeo de la api de adopciones", function () {
        it("El endpoint /api/pets debe crear una mascota", async function () {
            const mascotaMock = {
                name: "perro",
                specie: "golden",
                birthDate: "2025-05-05"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(mascotaMock);

            console.log(statusCode);
            console.log(ok);    
            console.log(_body);

            expect(_body.payload).to.have.property("_id");
        })   

        it("Al crear una maascota con los datos basicos. Se debe corroborar que cuente con un apropiedad adopted: false", async () => {
            
            const nuevaMascota = {
                name: "Suri",
                specie: "Caniche",
                birthDate: "2024-04-04"
            }   

            const {statusCode, _body} = await requester.post("/api/pets").send(nuevaMascota);
            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property("adopted").that.equal(false);
        })
    })
}) 

