/* 
    Path: /api/programas
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateInformation } = require("../Middlewares/validate-information");

const {
  getPrograma,
  createPrograma,
  updatePrograma,
  deletePrograma,
} = require("../Controllers/programas.controller");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getPrograma);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del programa es necesario").not().isEmpty(),
    validateInformation,
  ],
  createPrograma
);

router.put("/:id", validateJWT, updatePrograma);

router.delete("/:id", validateJWT, deletePrograma);

module.exports = router;
