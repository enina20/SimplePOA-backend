/* 
    Path: /api/buscar
*/

const { Router } = require("express");

const {
  getBusqueda,
  getBusquedaTotal,
  getBusquedaPorProyectos,
  getUnidadEjecutora, getProyectosUnidadEjecutora
} = require("../Controllers/search.controller");


const { } = require("../Middlewares/validate-jwt");

const router = Router();

router.get("/:termino",  getBusqueda);
router.get("/proyecto/:termino",  getBusquedaPorProyectos);
router.get("/total/:termino",  getBusquedaTotal);
router.get("/unidad/:termino",  getUnidadEjecutora);
router.get("/ejecutora/:termino",  getProyectosUnidadEjecutora);

module.exports = router;
