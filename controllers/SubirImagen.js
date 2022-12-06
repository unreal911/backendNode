const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const { v4: uuidv4 } = require('uuid');
const subirImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  const { url } = req.body;
  switch (coleccion) {
    case "usuarios":
      const usuariodb = await Usuario.findByIdAndUpdate(
        id,
        { img: { url: url } },
        { new: true }
      );
      res.json({
        ok: true,
        msg: `imagen subida correctamente`,
        result: usuariodb,
      });
      break;

    default:
      return res.status(500).json({
        ok: false,
        msg: `Hubo un error`,
      });
  }
};
const subirImagenFirebase = (req = request, res = response) => {
  const { colecccion } = req.params;
  const { usuario,...nuevoBody } = req.body;
  const { imagenes } = req.files;
  const uuid = uuidv4();
  return res.json({
    colecccion,
    nuevoBody,
    imagenes,
    uuid
  });
};
module.exports = {
  subirImagen,
  subirImagenFirebase,
};
