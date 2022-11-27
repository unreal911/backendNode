const { request, response } = require("express");
const Producto = require("../models/Producto");

const crearProducto = async (req = request, res = response) => {
  const { usuario, ...nuevoBody } = req.body;
  nuevoBody.usuario = req.usuario._id;
  const productodb = new Producto(nuevoBody);
  await productodb.save();
  return res.json({
    ok: true,
    result: productodb,
  });
};
module.exports = {
  crearProducto,
};
