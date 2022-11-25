const { Router } = require("express");
const { check } = require("express-validator");
const { usuarioLogin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.post("/", [
    check('email','el email es requerido').notEmpty(),
    check('password','el password es requerido').notEmpty(),
    validarCampos
], usuarioLogin);
module.exports = router;
