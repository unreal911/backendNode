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
    ok: true,
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
    ok: true,
    usuariodb,
  });
};
const listarUsuarios = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.params;
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
const actualizarPassword = async (req = request, res = response) => {
  const { passwordNew, passwordOld } = req.body
  const { id } = req.params
  const usuariodb = await Usuario.findById(id)
  const pwdiguales = bcrypt.compareSync(passwordOld, usuariodb.password);
  console.log(usuariodb)
  if (!pwdiguales) {
    return res.json({
      ok: false,
      msg: `La contraseña actual no coincide`
    })
  }
  let salt = bcrypt.genSaltSync(10);
  nuevoPassword = bcrypt.hashSync(passwordNew, salt);
  //tener cuidado con el findbyid y findone regresan resultados distintos
  const updatePWD = await Usuario.findByIdAndUpdate(id, { password: nuevoPassword }, { new: true })
  //console.log(updatePWD)
  return res.json({
    ok: true,
    result: updatePWD
  })


}
module.exports = {
  CrearUsuario,
  actualizarUsuario,
  actualizarRol,
  actualizarEstado,
  listarUsuarios,
  actualizarPassword
};
