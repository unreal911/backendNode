const { request, response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
var bcrypt = require("bcryptjs");
const usuario = require("../models/Usuario");
const usuarioLogin = async (req = request, res = response) => {
  const { email, password } = req.body;
  const usuariodb = await usuario.findOne({ email: email });
  if (!usuariodb) {
    return res.status(404).json({
      ok: false,
      msg: `el email ${email} no existe en la base de datos`,
    });
  }
  const pwdiguales = bcrypt.compareSync(password, usuariodb.password);
  if (!pwdiguales) {
    return res.status(403).json({
      ok: false,
      msg: `la contraseña es incorrecta`,
    });
  }
  token = await generarJWT(usuariodb.id);
  return res.json({
    ok: true,
    usuariodb,
    token,
  });
};
const renovarToken = async (req = request, res = response) => {
  const id = req.usuario.id
  const usuario = req.usuario
  const token = await generarJWT(id)
  res.json({
    ok: true,
    msg: 'Estas en el renovar token',
    token,
    usuario,
  })
}
module.exports = {
  usuarioLogin,
  renovarToken
};
