const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  listarCategorias,
  actualizarCategoria,
  categoriaxid,
  eliminarCategoria,
} = require("../controllers/categoria");
const {
  existeModelo,
  noexisteModelo,
  existeidModelo,
} = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const Categoria = require("../models/Categoria");
const router = Router();

router.post(
  "/",
  [
    verificarToken,
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("nombre").custom((nombre) =>
      existeModelo(nombre, "nombre", Categoria)
    ),
    check("estado", "el estado debe ser requerido").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);
router.get(
  "/:id",
  [
    verificarToken,
    check("id", "el id debe ser valido").isMongoId(),
    check("id", "el id es queredido").notEmpty(),
    check("id").custom((id) => existeidModelo(id, Categoria)),
    validarCampos,
  ],
  categoriaxid
);
router.put(
  "/:id",
  [
    verificarToken,
    check("id", "el id debe ser valido").isMongoId(),
    check("id", "el id es queredido").notEmpty(),
    check("id").custom((id) => existeidModelo(id, Categoria)),
    check("nombre").custom((nombre) =>
      existeModelo(nombre, "nombre", Categoria)
    ),
    validarCampos,
  ],
  actualizarCategoria
);
router.get(
  "/listar/:limite/:desde",
  [verificarToken, validarCampos],
  listarCategorias
);
router.delete('/:id', [
  verificarToken,
  check("id", "el id debe ser valido").isMongoId(),
  check("id", "el id es queredido").notEmpty(),
  check("id").custom((id) => existeidModelo(id, Categoria)),
  validarCampos],
  eliminarCategoria)
module.exports = router;
