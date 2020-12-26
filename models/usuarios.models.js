const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  celular: {
    type: String,
  },
  genero: {
    type: String,
  },
  fecha: {
    type: String,
  },
  unidad: {
    type: Number,
    required: true,
  },
  puesto: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  programa: {
    type: String,
    // required: true,
  },
  proyecto: {
    type: String,
    // required: true,
  },  
  role: {
    type: String,
    default: 'Usuario'
  },
  imagen: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Client", UsuarioSchema);
