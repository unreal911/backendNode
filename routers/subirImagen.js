const { Router } = require("express");
const { check } = require("express-validator");
const { subirImagen, subirImagenFirebase } = require("../controllers/SubirImagen");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const router = Router();
router.post("/:coleccion/:id", [
    verificarToken,
    check('id','el id es requerido').notEmpty(),
    check('id','debe ser un id valido').isMongoId(),
    check('url','el url es obligatorio').notEmpty(),
    check('coleccion','la coleccion es requerida').notEmpty(),
    check('coleccion','la coleccion debe ser validad').isIn(['usuarios','categorias','productos']),
    validarCampos
], subirImagen);
router.post('/:colecccion',[],subirImagenFirebase)
module.exports = router;
