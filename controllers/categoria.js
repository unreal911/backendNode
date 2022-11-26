const { request, response } = require("express");
const Categoria = require("../models/Categoria");

const crearCategoria = (req = request, res = response) => {
  console.log(req.usuario._id);
  req.body.usuario = req.usuario._id;
  const categoriaDB = new Categoria(req.body);
  categoriaDB.save();
  res.json({
    ok: false,
    categoriaDB,
  });
};
const listarCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, usuarios] = await Promise.all([
    Categoria.countDocuments(),
    Categoria.find().skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
module.exports = {
  crearCategoria,
  listarCategorias,
};
