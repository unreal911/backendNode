const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: { type: String, default: 'Sin descripcion' },
  disponible: { type: Boolean, defult: true },
  img: {
    type: Array,
    default: [
      {
        id: "Id",
        url: "image",
        titulo: "XD",
      },
    ],
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, estado, ...data } = this.toObject();
  data.uid = _id
  return data;
};

module.exports = model("Producto", ProductoSchema);
