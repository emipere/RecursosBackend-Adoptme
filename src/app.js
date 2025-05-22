import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)

app.use(express.json());
app.use(cookieParser());


app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.listen(PORT,()=>console.log(`escuchando en el puerto ${PORT}`))

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de la App Adoptme',
            description: 'App para encontrar mascotas en adopcion',
        },
    },    
    apis: ["./src/docs/**/*.yaml"],
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
