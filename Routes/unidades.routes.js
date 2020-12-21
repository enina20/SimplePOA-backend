/* 
    Path: /api/unidades
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateInformation } = require("../Middlewares/validate-information");

const {
  getUnidades,
  createUnidades,
  updateUnidad,
  deleteUnidad,
} = require("../Controllers/unidades.controller");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUnidades);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre de la Unidad ejecutora es necesaria")
      .not()
      .isEmpty(),
    validateInformation,
  ],
  createUnidades
);

router.put("/:id", validateJWT, updateUnidad);

router.delete("/:id", validateJWT, deleteUnidad);

module.exports = router;
