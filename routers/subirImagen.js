const { Router } = require("express");
const { check } = require("express-validator");
const { subirImagen } = require("../controllers/SubirImagen");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.post("/:coleccion/:id", [
    check('id','el id es requerido').notEmpty(),
    check('id','debe ser un id valido').isMongoId(),
    check('url','el url es obligatorio').notEmpty(),
    check('coleccion','la coleccion es requerida').notEmpty(),
    check('coleccion','la coleccion debe ser validad').isIn(['usuarios','categorias','productos']),
    validarCampos
], subirImagen);
module.exports = router;
