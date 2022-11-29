const { Router } = require("express");
const { check } = require("express-validator");
const {
  CrearUsuario,
  actualizarUsuario,
  actualizarRol,
  actualizarEstado,
  listarUsuarios,
  actualizarPassword,
} = require("../controllers/usuario");
const {
  existeModelo,
  noexisteModelo,
  existeidModelo,
} = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const {
  esAdminRole,
  validarAdminUsuario,
} = require("../middlewares/validar-roles");
const Usuario = require("../models/Usuario");
const usuario = require("../models/Usuario");

const router = Router();

router.get(
  "/listar/:limite/:desde",
  [verificarToken, esAdminRole, validarCampos],
  listarUsuarios
);
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
    validarAdminUsuario,
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
    check("id").custom((id) => existeidModelo(id, Usuario)),
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
    check("id").custom((id) => existeidModelo(id, Usuario)),
    check("estado", "el estado es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarEstado
);
router.put('/actualizarpwd/:id', [
  check('id', 'el id no debe estar vacio').notEmpty(),
  check('id', 'debe ser un id valido').isMongoId(),
  check('passwordNew', 'el password nuevo es requerido').notEmpty(),
  check('passwordOld', 'El password actual es requerido').notEmpty(),
  validarCampos
], actualizarPassword)

module.exports = router;
