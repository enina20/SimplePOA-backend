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
const { } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/",  getPrograma);

router.post(
  "/",  [
    
    check("responsable", "El nombre del programa es necesario").not().isEmpty(),
    check("detalle", "La unidad ejecutora del programa es necesario").not().isEmpty(),
    validateInformation,
  ],
  createPrograma
);

router.put("/:id",  updatePrograma);

router.delete("/:id",  deletePrograma);

module.exports = router;
