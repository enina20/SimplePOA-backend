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
const { } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/",  getEmployees);

router.post(
  "/",
  [
    check("email", "El email es requerido").not().isEmpty(),
    check("positionHeld", "El cargo es requerido").not().isEmpty(),
    validateInformation,
    
  ],
  createEmployees
);

router.put("/:id",  updateEmployees);

router.delete("/:id",  deleteEmployees);

module.exports = router;
