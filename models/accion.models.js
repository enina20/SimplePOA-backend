const { Schema, model } = require("mongoose");

const AccionSchema = Schema({
 
  detalle: {
    type: String,
    default: "Servicios de administracion consejo municipal",
    required: false,
  },
  estado: {
    type: String,
    default: "No concluida"
  },
  responsable: {
    type: String,
    default: "Jose Luis Perales"
  },
  fecha: {
    type: String,
    default: "15/15/15"
  },    
  status: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = model("Accion", AccionSchema);
