const jwt = require("jsonwebtoken");
const { response } = require("express");

const validateJWT = (req, res = response, next) => {
  // Read token

  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SEED);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no valido",
    });
  }
};

module.exports = {
  validateJWT,
};
