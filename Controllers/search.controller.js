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
};
