import { Router } from "express";
import { check } from "express-validator";
import { getUsers, getUserById, updateUser, deleteUser, changePassword} from "./user.controller.js";
import { existeUsuarioById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { uploadPetPicture } from "../middlewares/multer-upload.js";
import { tieneRole } from "../middlewares/validar-role.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", getUsers);

router.get(
    "/findUser/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    uploadPetPicture.single('profilePicture'),
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser
)

router.put(
    "/:id/change-password",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check('oldPassword', 'La contraseña actual es obligatoria').notEmpty(),
        check('newPassword', 'La nueva contraseña es obligatoria').notEmpty(),
        validarCampos
    ],
    changePassword
)

export default router;