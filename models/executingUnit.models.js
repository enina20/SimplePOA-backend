const { Schema, model } = require("mongoose");

const ExecutingUnitSchema = Schema(
  {

    nombre:{
      type: String,
      default: 'Administrativos Centrales'
    },
    direccion: {
      type: String,
      default: 'Concejo Municipal'
    },
    unidad:{
      type: String,
      default: 'Administración Concejo Municipal'
    },
    fondo: {
      type: String,
      default: 'Fondo de funcionamiento'
    },
    tipoope: {
      type: String,
      default: 'Funcionamiento'
    },   
    manager: {
      type: String,
      default: 'Daniela Marca'
    },
    link: {
      type: String,
      default: 'aqui va el link'
    },
    numdireccion:{
      type: Number,
      default: 2
    },   
    numunidad:{
      type: Number,
      default: 1
    },
    numfondo:{
      type: Number,
      default: 2
    },
    numtipo:{
      type: Number,
      default: 2
    },
    status: {
      type: Boolean,
      default: true,
    },    
  },
  { collection: "unidades" }
);

ExecutingUnitSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.unitId = _id;
  return object;
});

module.exports = model("Unidad", ExecutingUnitSchema);
