/* 
    Path: /api/acciones
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateInformation } = require("../Middlewares/validate-information");

const {
  getAcciones,
  createAcciones,
  updateAcciones,
  deleteAcciones,
  getAccionesUnidadEjecutora
} = require("../Controllers/acciones.controller");

const router = Router();

router.get("/", getAcciones);
router.get("/unidad/:termino",  getAccionesUnidadEjecutora);

router.post(
  "/",
  [
    check("detalle", "El detalle de la accion es necesario").not().isEmpty(),
    validateInformation,
  ],
  createAcciones
);

router.put("/:id", updateAcciones);

router.delete("/:id", deleteAcciones);

module.exports = router;
