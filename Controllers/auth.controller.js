const { response } = require("express");
const bcrypt = require("bcryptjs");

const Client = require("../models/usuarios.models");
const { generateJWT } = require("../Helpers/jwt");
const { googleVerify } = require("../Helpers/google-verify");

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
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error en la base de datos",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);

    //Buscar al usuario
    const clientDB = await Client.findOne({ email });

    let client;
    //Verificar si no existe,
    if (!clientDB) {
      client = new Client({
        name,
        email,
        password: "123",
        imgUrl: picture,
        google: true,
      });
    } else {
      //si existe
      (client = clientDB), (client.google = true);
    }

    //Guardar en la base de datos
    await client.save();

    //Generate token
    const token = await generateJWT(client.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "token invalido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
