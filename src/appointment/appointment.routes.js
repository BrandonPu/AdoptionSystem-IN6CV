import { Router } from "express";
import { check } from "express-validator";
import { saveAppointment, getAppointment } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("email", "Este no es correo válido").not().isEmpty(),
        validarCampos 
    ],
    saveAppointment
)

router.get("/", getAppointment)

export default router;