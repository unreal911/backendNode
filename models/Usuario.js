const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: Object,
        default: {
            id: "NoImage",
            url: "nodefinido",
        },
    },
    rol: {
        type: String,
        required: true,
        default: "ADMIN_ROL",
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UsuarioSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Usuario", UsuarioSchema);
