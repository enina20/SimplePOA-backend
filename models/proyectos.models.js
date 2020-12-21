const { Schema, model } = require("mongoose");

const ProyectoSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  politica: {
    type: String,
    default: "1",
  },
  ACD: {
    type: String,
    default: "203",
  },
  actividad: {
    type: String,
    default: "001",
  },
  operacion: {
    type: String,
    default: "Servicios de administracion consejo municipal",
  },
  fecha_inicio: {
    type: String,
  },
  fecha_fin: {
    type: String,
  },
  presupuesto: {
    required: true,
    type: String,
  },
});

ProyectoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.proyId = _id;
  return object;
});

module.exports = model("Proyecto", ProyectoSchema);
