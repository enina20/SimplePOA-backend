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
const {} = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/", getUnidades);

router.post("/", createUnidades);

router.put("/:id", updateUnidad);

router.delete("/:id", deleteUnidad);

module.exports = router;
