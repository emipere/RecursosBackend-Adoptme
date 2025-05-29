https://hub.docker.com/repository/docker/emipere/b3entregafinal/general

Proyecto backend para gestión de adopciones de mascotas.

Ejecución del proyecto con Docker

1.  Clonar el repositorio

git clone https:

2. Construir la imagen Docker localmente

docker build -t emipere/b3entregafinal:latest .

3. Ejecutar el contenedor

docker run -d -p 8080:8080 --name adoptme-backend \
 -e MONGO_URL="mongodb+srv://emipereiro:Salu1805@cluster.mongodb.net/Backend3Final?retryWrites=true&w=majority&appName=Cluster0" \
 emipere/b3entregafinal:latest

4.  Usar la imagen desde Docker Hub

Si no quieres construir la imagen localmente, podes tomar y usar la imagen publicada en Docker Hub:

docker pull emipere/b3entregafinal:latest

docker run -d -p 8080:8080 --name recursosbackend-adoptme \
 -e MONGO_URL="mongodb+srv://usuario:clave@cluster.mongodb.net/Backend3Final?retryWrites=true&w=majority&appName=Cluster0" \
 emipere/proyecto-prueba:latest

5. Una vez el contenedor esté corriendo, puedes acceder a la API en:

http://localhost:8080

Scripts útiles

npm run dev

Ejecutar tests:

npm run test
npm run testChai
npm run testSuper
npm run testSuperA
