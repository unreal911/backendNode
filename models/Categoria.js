const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
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
  img: {
    type: Object,
    default: {
      id: "NoImage",
      url: "nodefinido",
    },
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v,_id, ...data } = this.toObject();
  data.uid=_id
  return data;
};

module.exports = model("Categoria", CategoriaSchema);
