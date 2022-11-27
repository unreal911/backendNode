const { request, response } = require("express");
const Producto = require("../models/Producto");

const crearProducto = async (req = request, res = response) => {
    const { usuario, ...nuevoBody } = req.body;
    nuevoBody.usuario = req.usuario._id;
    const productodb = new Producto(nuevoBody);
    await productodb.save();
    return res.json({
        ok: true,
        result: productodb,
    });
};

const listarProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, usuarios] = await Promise.all([
        Producto.countDocuments(),
        Producto.find().skip(Number(desde)).limit(Number(limite)),
    ]);
    return res.json({
        total,
        usuarios,
    });
};
const obtenerProductoxid = async (req = request, res = response) => {
    const { id } = req.params
    const productodb = await Producto.findById(id)
    if (!productodb) {
        return res.status(404).json({
            ok: false,
            msg: `no se encontro el producto`
        })
    }
    return res.json({
        ok: true,
        result: productodb
    })


}
const actualizarProducto = async (req = request, res = response) => {
    const { usuario, ...nuevoBody } = req.body;
    const { id } = req.params
    nuevoBody.usuario = req.usuario._id;
    const productodb = await Producto.findByIdAndUpdate(id, nuevoBody, {
        new: true,
    });
    return res.json({
        ok: true,
        result: productodb,
    });
};

module.exports = {
    crearProducto,
    listarProductos,
    actualizarProducto,
    obtenerProductoxid
};
