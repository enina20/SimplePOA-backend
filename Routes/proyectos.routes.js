/* 
    Path: /api/unidades
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateInformation } = require("../Middlewares/validate-information");

const {
  getProyectos,
  createProyectos,
  updateProyecto,
  deleteProyecto,
} = require("../Controllers/proyectos.controller");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/", getProyectos);

router.post(
  "/",
  [
    check("name", "El nombre del proyecto es necesario").not().isEmpty(),
    check("presupuesto", "El presupuesto del proyecto es necesario")
      .not()
      .isEmpty(),
    validateInformation,
  ],
  createProyectos
);

router.put("/:id", updateProyecto);

router.delete("/:id", deleteProyecto);

module.exports = router;
