/*
    Path: 'api/login'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { login, validarToken } = require("../Controllers/auth.controller");
const { validateInformation } = require("../Middlewares/validate-information");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.post(
  "/",
  [
    check("password", "La contrasenha es requerida").not().isEmpty(),
    check("email", "El email es requerida").isEmail(),
    validateInformation,
  ],
  login
);

router.get(
    "/validar",
    validateJWT,
    validarToken
  );

module.exports = router;
