/*
    Ruta: /api/clients
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validateInformation } = require("../Middlewares/validate-information");

const {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
} = require("../Controllers/usuarios.controller");
const {} = require("../Middlewares/validate-jwt");
const { validarToken } = require("../Controllers/auth.controller");

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", validarToken, getUsuarioById);

router.post(
  "/",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "La contrasenha es requerida").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("cedula", "La cedula de identidad es requerida").not().isEmpty(),
    check("unidad", "La unidad ejecutora es requerida").not().isEmpty(),
    check("puesto", "El puesto es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es requerida").not().isEmpty(),
    check("programa", "El programa es requerida").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
    validateInformation,
  ],
  createUsuario
);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

module.exports = router;
