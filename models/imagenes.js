const { Schema, model } = require("mongoose");

const imagenesSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    fullPath: {
        type: String,
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }
});

imagenesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Imagenes", imagenesSchema);
