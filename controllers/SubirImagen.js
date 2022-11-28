const { request, response } = require("express");
const Usuario = require("../models/Usuario");

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
module.exports = {
  subirImagen,
};
