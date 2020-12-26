const { response } = require("express");
const bcrypt = require("bcryptjs");

const Client = require("../models/usuarios.models");
const { generateJWT } = require("../Helpers/jwt");
const mongoose = require("mongoose");

///////////////////////////////////////////////////
//   DEVUELVE TODOS LOS USUARIOS
///////////////////////////////////////////////////
const getUsuarios = async (req, res) => {
  let desde = Number(req.query.desde) || 0;
  let limite = Number(req.query.limite) || 10;

  const [usuarios, total] = await Promise.all([
    Client.find({ status: true }).limit(limite).skip(desde),

    Client.countDocuments(),
  ]);

  console.log(total);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

///////////////////////////////////////////////////
//   DEVUELVE UN USUARIO SEGUN SU ID
///////////////////////////////////////////////////
const getUsuarioById = async (req, res) => {
  const uid = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(uid)) {
    res.status(400).json({
      ok: false,
      message: "El id no es valido",
    });
  }

  const usuario = await Client.findById(uid);
  res.json({
    ok: true,
    usuario,
  });
};

///////////////////////////////////////////////////
//   CREA UN USUARIO
///////////////////////////////////////////////////
const createUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const emailExists = await Client.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: "El correo ya esta registrado",
      });
    }
    const usuario = new Client(req.body);
    console.log(usuario);

    //Password encryption
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Save the client in the database
    await usuario.save();

    //Generate token
    const token = await generateJWT(usuario.id);

    res.json({
      ok: true,
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

///////////////////////////////////////////////////
//   ACTUALIZA UN USUARIO
///////////////////////////////////////////////////
const updateUsuario = async (req, res = response) => {
  const uid = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(uid)) {
    res.status(400).json({
      ok: false,
      message: "El id no es valido",
    });
  }

  try {
    const clientDB = await Client.findById(uid);
    if (!clientDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe el usuario en la base de datos",
      });
    }

    // Client update
    const { email } = req.body;
    console.log(email);

    if (email !== undefined && clientDB.email !== email) {
      const emailExists = await Client.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          message: "El correo ya esta registrado",
        });
      }
    }

    const updatedClient = await Client.findByIdAndUpdate(uid, req.body, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: updatedClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,

      message: "Error en la base de datos",
    });
  }
};

///////////////////////////////////////////////////
//   ELIMINA UN USUARIO
///////////////////////////////////////////////////
const deleteUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const clientDB = await Client.findById(uid);
    if (!clientDB) {
      return res.status(404).json({
        ok: false,
        message: "No existe el usuario en la base de datos 1",
      });
    }

    // Delete client

    if (clientDB.status) {
      let changeStatus = {
        status: false,
      };

      const updatedClient = await Client.findByIdAndUpdate(uid, changeStatus, {
        new: true,
      });

      res.json({
        ok: true,
        client: updatedClient,
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: "No existe el usuario en la base de datos 2",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos 3",
    });
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
};
