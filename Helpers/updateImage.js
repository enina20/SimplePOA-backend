const fs = require("fs");
const Client = require("../models/usuarios.models");
const Employee = require("../models/employees.models");
const Unidad = require("../models/executingUnit.models");
const mongoose = require("mongoose");
const { response } = require("express");

const deletePreviousImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (id, fileName, res = response) => {
  console.log(id, fileName);
  console.log("#########");
  console.log(id, mongoose.Types.ObjectId.isValid(id));
  console.log("***************************************");
  const client = await Client.findById(id);
  console.log("****", client.name);

  console.log("***************************************");

  try {
    const client = await Client.findById(id);

    if (!client) {
      console.log("No existe un cliente con ese id");
      return false;
    }

    const pathPrevius = `./Uploads/usuarios/${client.imagen}`;

    console.log("anterior", pathPrevius);

    deletePreviousImage(pathPrevius);

    client.imagen = fileName;

    await client.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

module.exports = {
  updateImage,
};
