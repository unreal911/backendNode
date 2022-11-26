const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  listarCategorias,
} = require("../controllers/categoria");
const { existeModelo } = require("../helpers/validarModelo");
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
router.get("/listar/:limite/:desde", [verificarToken, validarCampos], listarCategorias);
module.exports = router;
