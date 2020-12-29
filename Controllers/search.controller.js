const { response } = require("express");
const bcrypt = require("bcryptjs");

const Client = require("../models/usuarios.models");
const Employee = require("../models/employees.models");
const Unidad = require("../models/executingUnit.models");
const Proyecto = require("../models/proyectos.models");

const getBusqueda = async (req, res = response) => {
  const termino = req.params.termino;
  const regex = new RegExp(termino, "i");

  const [clients, employees, unidades] = await Promise.all([
    Client.find({ name: regex }),
    Employee.find({ name: regex }),
    Unidad.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    clients,
  });
};

const getBusquedaPorProyectos = async (req, res = response) => {
  const termino = req.params.termino;
  const regex = new RegExp(termino, "i");

  const [clients] = await Promise.all([Client.find({ programa: regex })]);

  res.json({
    ok: true,
    clients,
  });
};

const getUsuarioPorUnidadEjecutora = async (req, res) => {

    const termino = req.params.termino;
    const clients = await Client.find({unidad: termino});
    res.json({
      ok: true,
      clients,
    });
  };
  

const getUnidadEjecutora = async (req, res) => {
  const unidad = req.params.termino;  

  const unidades = await Unidad.findOne({unidad});
  res.json({
    ok: true,
    unidades,
  });
};

const getProyectosUnidadEjecutora = async (req, res) => {  

  const termino = req.params.termino;
  const proyectos = await Proyecto.find({name: termino});
  res.json({
    ok: true,
    proyectos,
  });
};

const getBusquedaTotal = async (req, res = response) => {
  const termino = req.params.termino;
  const regex = new RegExp(termino, "i");

  const [clients, proyectos] = await Promise.all([
    Client.find({ name: regex }),
    Proyecto.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    clients,
    proyectos,
  });
};

module.exports = {
  getBusqueda,
  getBusquedaTotal,
  getBusquedaPorProyectos,
  getUnidadEjecutora,
  getProyectosUnidadEjecutora,
  getUsuarioPorUnidadEjecutora
};
