const { Schema, model } = require("mongoose");

const ProgramaSchema = Schema({

  codigo:{
    type: String,
    default: "001",
  },
  responsable: {
    type: String,
    required: true,
    unique: true,
  },
  detalle: {
    type: String,
    required: true,
  },   
  estado: {
    type: String,
    default: "pendiente",
  },
  fecha: {
    type: String,
    default: "12/12/12",
  },
  unidad:{
    type: String,
    required: true,
    default: "Concejo municipal",    
  },
  proyecto: {
    type: String,
    default: "Aplicaion web",
  },  
  status: {
    type: Boolean,
    default: true,
  }
});

module.exports = model("Programa", ProgramaSchema);
