import { faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';


class MockingService {
    static async generarMascotasMocking(cantidad) {
        const pets = [];
        for (let i = 0; i < cantidad; i++) {
            pets.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false,
                birthDate: faker.date.past(),
                Image: "https://via.placeholder.com/150",
          
            });
            
        }
        return pets;

    }
    static async generarUsuariosMocking(cantidad) {
        const users = [];
        for (let i = 0; i < cantidad; i++) {
            users.push({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync('coder123', 5),
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: [],
            });
        }
        return users;
    }
}
    export default MockingService;