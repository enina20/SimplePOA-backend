/* 
    Path: /api/buscar
*/

const { Router } = require("express");

const {
  getBusqueda,
  getBusquedaPorColeccion,
} = require("../Controllers/search.controller");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/:termino", validateJWT, getBusqueda);
router.get("/:coleccion/:termino", validateJWT, getBusquedaPorColeccion);

module.exports = router;
