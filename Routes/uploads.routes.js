/* 
    Path: /api/subir
*/

const { Router } = require("express");
const expressFileUoload = require("express-fileupload");

const { fileUploads, getImage } = require("../Controllers/uploads.controller");
const {} = require("../Middlewares/validate-jwt");

const router = Router();

router.use(expressFileUoload());
router.put("/:coleccion/:id", fileUploads);
router.get("/:coleccion/:imagen", getImage);

module.exports = router;
