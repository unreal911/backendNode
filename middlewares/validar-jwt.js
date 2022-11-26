const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const usuario = require("../models/Usuario");

const verificarToken = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(404).json({
      ok: false,
      msg: `no hay token en la peticion`,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JSONWEBTOKEN);
    const usuariodb = await usuario.findById(id);
    // console.log(usuariodb);
    if (!usuariodb) {
      return res.status(404).json({
        ok: false,
        msg: `usuario no encontrado -- token no valido`,
      });
    }
    if (!usuariodb.estado) {
      return res.status(403).json({
        ok: false,
        msg: `usuario no autorizado /false`,
      });
    }
    req.usuario = usuariodb;
    console.log(req.usuario);
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      ok: false,
      msg: `token no valido`,
    });
  }
};
module.exports = {
  verificarToken,
};
