const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseHidden = require("mongoose-hidden")();

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  descripcion: {
    type: String,
    required: [true, "Descripción es requerida"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
