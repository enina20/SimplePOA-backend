const fs = require("fs");
const Client = require("../models/usuarios.models");
const Employee = require("../models/employees.models");
const Unidad = require("../models/executingUnit.models");

const deletePreviousImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (coleccion, id, path, fileName) => {
  switch (coleccion) {
    case "clients":
      const client = await Client.findById(id);

      if (!client) {
        console.log("No existe un cliente con ese id");
        return false;
      }

      const pathPrevius = `./Uploads/clients/${client.imgUrl}`;

      deletePreviousImage(pathPrevius);

      client.imgUrl = fileName;

      await client.save();
      return true;
      break;
    case "unidades":
      break;

    case "empleados":
      break;

    default:
      res.status(400).json({
        ok: false,
        message: "Error en las colecciones",
      });
      break;
  }
};

module.exports = {
  updateImage,
};
