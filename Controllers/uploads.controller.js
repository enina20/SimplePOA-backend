const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../Helpers/updateImage");

const fileUploads = (req, res = response) => {
  const id = req.params.id;
  const coleccion = req.params.coleccion;

  //Validar la collecion
  const collecctions = ["usuarios"];

  if (!collecctions.includes(coleccion)) {
    return res.status(400).json({
      ok: false,
      message: "Coleccion no valida",
    });
  }

  //Validamos que exista el archivo

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      message: "No hay ningun archivo",
    });
  }

  //Procesar la imagen
  const file = req.files.imagen;

  const tempName = file.name.split(".");
  const extensionArchivo = tempName[tempName.length - 1];

  //Validate extension

  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      message: "Extension no valida",
    });
  }

  //Generate el nombre del archivo
  const fileName = `${uuidv4()}.${extensionArchivo}`;

  //Path para guardar la imagen
  const path = `./Uploads/${coleccion}/${fileName}`;
  console.log(path);

  //Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: "Error en mover la imagen",
      });
    }

    console.log("daniela ===>  ", id);

    //Actualizar imagen
    updateImage(id, path, fileName);

    res.json({
      ok: true,
      fileName,
      message: "Archivo subido",
    });
  });
};

const getImage = (req, res = response) => {
  const coleccion = req.params.coleccion;
  const imagen = req.params.imagen;

  const pathImg = path.join(__dirname, `../Uploads/${coleccion}/${imagen}`);

  //Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../Uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUploads,
  getImage,
};
