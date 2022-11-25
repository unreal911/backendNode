const { Router } = require("express");
const { check } = require("express-validator");
const {
  CrearUsuario,
  actualizarUsuario,
  actualizarRol,
  actualizarEstado,
} = require("../controllers/usuario");
const { existeModelo, noexisteModelo } = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const usuario = require("../models/Usuario");

const router = Router();

router.post(
  "/",
  [
    check("password", "el passord es obligatorio").notEmpty(),
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("email", "el email debe ser obligatorio").notEmpty().isEmail(),
    check("email").custom((email) => existeModelo(email, "email", usuario)),
    validarCampos,
  ],
  CrearUsuario
);
router.put(
  "/:id",
  [
    verificarToken,
    check("id", "debe ser un id valido").isMongoId(),
    check("email").custom((email) => existeModelo(email, "email", usuario)),
    validarCampos,
  ],
  actualizarUsuario
);
router.put(
  "/rol/:id",
  [
    verificarToken,
    esAdminRole,
    check("id", "el id no es valido").notEmpty().isMongoId(),
    check("id").custom((id) => noexisteModelo(id, "id", usuario)),
    check("rol", "No es un rol valido").isIn([
      "ADMIN_ROL",
      "USER_ROL",
      "DEV_ROL",
    ]),
    validarCampos,
  ],
  actualizarRol
);
router.put(
  "/estado/:id",
  [
    verificarToken,
    esAdminRole,
    check("id", "el id no es valido").notEmpty().isMongoId(),
    check("id").custom((id) => noexisteModelo(id, "id", usuario)),
    check("estado", "el estado es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarEstado
);

module.exports = router;
