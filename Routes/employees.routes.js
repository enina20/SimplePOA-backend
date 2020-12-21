/* 
    Path: /api/employees
*/

const { Router } = require("express");
const { check } = require("express-validator");

const {
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
} = require("../Controllers/employees.controller");
const { validateInformation } = require("../Middlewares/validate-information");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getEmployees);

router.post(
  "/",
  [
    check("email", "El email es requerido").not().isEmpty(),
    check("positionHeld", "El cargo es requerido").not().isEmpty(),
    validateInformation,
    validateJWT,
  ],
  createEmployees
);

router.put("/:id", validateJWT, updateEmployees);

router.delete("/:id", validateJWT, deleteEmployees);

module.exports = router;
