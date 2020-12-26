const { response } = require("express");
const bcrypt = require("bcryptjs");

const Client = require("../models/usuarios.models");
const { generateJWT } = require("../Helpers/jwt");
const { googleVerify } = require("../Helpers/google-verify");
const { getSideBar } = require("../Helpers/sidebar-frontend");

///////////////////////////////////////////////////
//   LOGIN DEL USUARIO
///////////////////////////////////////////////////
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verify email
    const clientDB = await Client.findOne({ email });

    if (!clientDB) {
      return res.status(404).json({
        ok: false,
        message: "Email no encontrado",
      });
    }
    //verify password
    const validPassword = bcrypt.compareSync(password, clientDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        message: "Contrasena no valida",
      });
    }

    //Generate token
    const token = await generateJWT(clientDB.id);

    res.json({
      ok: true,
      clientDB,
      token,
      sidebar: getSideBar(clientDB.role, clientDB.unidad),
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
//   VALIDAR EL TOKEN DEL USUARIO
///////////////////////////////////////////////////
const validarToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generateJWT(uid);

  const client = await Client.findById(uid);

  res.json({
    ok: true,
    token,
    client,
    sidebar: getSideBar(client.role, client.unidad),
  });
};

module.exports = {
  login,
  validarToken,
};
