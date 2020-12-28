const { response } = require("express");
const mongoose = require("mongoose");
const Proyecto = require("../models/proyectos.models");

const getProyectos = async (req, res) => {
  const proyectos = await Proyecto.find();

  res.json({
    ok: true,
    proyectos,
  });
};

const getProyectoById = async (req, res) => {
  const proyId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(proyId)) {
    res.status(400).json({
      ok: false,
      message: "El id no es valido",
    });
  }
  const proyecto = await Proyecto.findById(proyId);
  res.json({
    ok: true,
    proyecto,
  });
};

const createProyectos = async (req, res = response) => {
  const proyecto = new Proyecto(req.body);

  try {
    const proyectoBD = await proyecto.save();

    res.json({
      ok: true,
      proyecto: proyectoBD,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

const updateProyecto = async (req, res = response) => {
  const proyId = req.params.id;

  try {
    const proyectoDB = await Proyecto.findById(proyId);
    if (!proyectoDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proyecto en la base de datos",
      });
    }
    const fields = req.body;
    const updatedProyecto = await Proyecto.findByIdAndUpdate(proyId, fields, {
      new: true,
    });

    res.json({
      ok: true,
      proyecto: updatedProyecto,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

const deleteProyecto = async (req, res = response) => {
  const proyId = req.params.id;

  try {
    let changeStatus = {
      status: false,
    };

    const updatedProyecto = await Proyecto.findByIdAndUpdate(
      proyId,
      changeStatus,
      { new: true }
    );

    res.json({
      ok: true,
      client: updatedProyecto,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos 3",
    });
  }
};

module.exports = {
  getProyectos,
  createProyectos,
  updateProyecto,
  deleteProyecto,
  getProyectoById
};
