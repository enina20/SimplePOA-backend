/* 
    Path: /api/subir
*/

const { Router } = require("express");
const expressFileUoload = require("express-fileupload");

const { fileUploads, getImage } = require("../Controllers/uploads.controller");
const { validateJWT } = require("../Middlewares/validate-jwt");

const router = Router();

router.use(expressFileUoload());
router.put("/:coleccion/:id", validateJWT, fileUploads);
router.get("/:coleccion/:imagen", validateJWT, getImage);

module.exports = router;
