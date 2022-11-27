const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearProducto,
    listarProductos,
    actualizarProducto,
    obtenerProductoxid,
} = require("../controllers/producto");
const { existeModelo, existeidModelo } = require("../helpers/validarModelo");
const { validarCampos } = require("../middlewares/validar-campos");
const { verificarToken } = require("../middlewares/validar-jwt");
const Categoria = require("../models/Categoria");
const Producto = require("../models/Producto");
const router = Router();
router.post(
    '/',
    [
        verificarToken,
        check("nombre", "el nombre es requerido").notEmpty(),
        check("nombre").custom((nombre) =>
            existeModelo(nombre, "nombre", Producto)
        ),
        check("categoria", "La categoria es requerida").notEmpty(),
        check("categoria", "tiene que ser un id valido").isMongoId(),
        check("categoria").custom((categoria) =>
            existeidModelo(categoria, Categoria)
        ),

        validarCampos,
    ],
    crearProducto
);
router.put(
    '/:id',
    [
        verificarToken,
        check("nombre").custom((nombre) =>
            existeModelo(nombre, "nombre", Producto)
        ),
        check("categoria", "La categoria es requerida").notEmpty(),
        check("categoria", "tiene que ser un id valido").isMongoId(),
        check("categoria").custom((categoria) =>
            existeidModelo(categoria, Categoria)
        ),
        validarCampos,
    ],
    actualizarProducto
);
router.get(
    '/listar/:limite/:desde',
    [verificarToken, validarCampos],
    listarProductos
);
router.get('/:id', [
    verificarToken,
    check('id', 'id no debe estar vacio').notEmpty(),
    check('id', 'El id debe ser valido').isMongoId(),
    validarCampos
], obtenerProductoxid)
module.exports = router;
