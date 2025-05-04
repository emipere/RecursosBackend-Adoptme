import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";
const router = Router();

router.get('/mockingpets', mocksController.crearMascotas);
router.get('/mockingusers', mocksController.crearUsuarios);
router.post('/generateData', mocksController.generarDatos);

export default router;