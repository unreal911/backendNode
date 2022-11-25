const { request, response } = require("express");
const Usuario = require("../models/Usuario");
var bcrypt = require("bcryptjs");
const usuario = require("../models/Usuario");
const CrearUsuario = async (req = request, res = response) => {
  const { password, estado, rol, ...nuevoBody } = req.body;
  let salt = bcrypt.genSaltSync(10);
  nuevoPassword = bcrypt.hashSync(password, salt);
  nuevoBody.password = nuevoPassword;
  const usuariodb = new Usuario(nuevoBody);
  await usuariodb.save();
  res.json({
    ok: true,
    msg: `se guardo el usuario `,
    usuariodb,
  });
};
const actualizarUsuario = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, estado, rol, ...nuevoBody } = req.body;
  const usuariotoken = req.usuario;

  if (password) {
    let salt = bcrypt.genSaltSync(10);
    nuevoPassword = bcrypt.hashSync(password, salt);
    nuevoBody.password = nuevoPassword;
  } else {
    delete nuevoBody.password;
  }
  const usuariodb = await Usuario.findByIdAndUpdate(id, nuevoBody, {
    new: true,
  });
  res.json({
    ok: true,
    usuariodb,
    usuariotoken,
  });
};
const actualizarRol = async (req = request, res = response) => {
  const { id } = req.params;
  const { rol } = req.body;
  const usuariodb = await usuario.findByIdAndUpdate(
    id,
    { rol: rol },
    { new: true }
  );
  return res.json({
    ok: false,
    usuariodb,
  });
};
const actualizarEstado = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado } = req.body;
  const usuariodb = await usuario.findByIdAndUpdate(
    id,
    { estado: estado },
    { new: true }
  );
  return res.json({
    ok: false,
    usuariodb,
  });
};
const listarUsuarios = async (req = request, res = response) => {
  const usuariodb = await usuario.find();
  res.json({
    ok: false,
    usuariodb,
  });
};
module.exports = {
  CrearUsuario,
  actualizarUsuario,
  actualizarRol,
  actualizarEstado,
  listarUsuarios
};
