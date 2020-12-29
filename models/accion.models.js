const { Schema, model } = require("mongoose");

const AccionSchema = Schema({
 
  detalle: {
    type: String,
    default: "Servicios de administracion consejo municipal",
    // required: false,
  },
  unidad: {
    type: String,
  },
  estado: {
    type: String,
    default: "No concluida"
  },
  responsable: {
    type: String,
    default: "Jose Luis Perales"
  },
  inicio: {
    type: String,
    default: "01/01/21"
  },   
  fin: {
    type: String,
    default: "01/12/21"
  },  
  status: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = model("Accion", AccionSchema);
