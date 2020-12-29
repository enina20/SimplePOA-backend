const { response } = require("express");
const Accion = require("../models/accion.models");

const getAcciones = async (req, res) => { 

  const [acciones, total] = await Promise.all([
    Accion.find({ }),
    Accion.countDocuments(),
  ]);

  res.json({
    ok: true,
    acciones,
    total
  });
};

const getAccionesUnidadEjecutora = async (req, res) => { 

  const termino = req.params.termino;
  const acciones = await Accion.find({unidad: termino})
  res.json({
    ok: true,
    acciones,
  });
};

const createAcciones = async (req, res = response) => {
  const accion = new Accion(req.body);

  try {
    const accionBD = await accion.save();

    res.json({
      ok: true,
      accion: accionBD,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};



const updateAcciones = async (req, res = response) => {
  const Id = req.params.id;
  try {
    const accionDB = await Accion.findById(Id);
    if (!accionDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proyecto en la base de datos",
      });
    }

    // Unidad update
    const fields = req.body;

    const updatedAccion = await Accion.findByIdAndUpdate(Id, fields, {
      new: true,
    });

    res.json({
      ok: true,
      accion: updatedAccion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

const deleteAcciones = async (req, res = response) => {
  const Id = req.params.id;

  try {
    // Delete client
    let changeStatus = {
      status: false,
    };

    const updatedAccion = await Accion.findByIdAndUpdate(Id, changeStatus, {
      new: true,
    });

    res.json({
      ok: true,
      accion: updatedAccion,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos 3",
    });
  }
};

module.exports = {
  getAcciones,
  createAcciones,
  updateAcciones,
  deleteAcciones,
  getAccionesUnidadEjecutora
};
