const { Router } = require("express");
const { check } = require("express-validator");
const { usuarioLogin, renovarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const router = Router();

router.post("/", [
    check('email', 'el email es requerido').notEmpty(),
    check('password', 'el password es requerido').notEmpty(),
    validarCampos
], usuarioLogin);
router.get('/renovarToken', [
    verificarToken,
    validarCampos
],
    renovarToken
)
module.exports = router;
