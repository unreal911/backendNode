const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  console.log(req.usuario);
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROL") {
    console.log(rol)
    console.log("mensaje");
    return res.status(401).json({
      msg: `${nombre} no es el administrador -- no puede hacer esto`,
    });
  }

  next();
};
module.exports = {
  esAdminRole,
};
