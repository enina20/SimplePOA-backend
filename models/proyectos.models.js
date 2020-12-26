const { Schema, model } = require("mongoose");

const ProyectoSchema = Schema({

  poa: {
    type: String,
    required: true,
    default: "002",
  },
  politica: {
    type: String,
    default: "1",
  },
  acp: {
    type: String,
    default: "203",
  },
  programa: {
    type: String,
    default: "001",
  },
  proyecto: {
    type: String,
    default: "001",
  },
  actividad: {
    type: String,
    default: "001",
  },
  operacion: {
    type: String,
    default: "Servicios de administracion consejo municipal",
  },
  inicio: {
    type: String,
    default: "12/12/12",
  },
  fin: {
    type: String,
    default: "15/15/15",
  },
  presupuesto: {
    required: true,
    type: String,
  },
  encargado: {
    type: String,
    required: true,
    default: "Edson",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  
});

ProyectoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.proyId = _id;
  return object;
});

module.exports = model("Proyecto", ProyectoSchema);
