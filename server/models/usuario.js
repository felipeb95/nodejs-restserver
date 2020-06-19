const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongooseHidden = require('mongoose-hidden')()

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'Nombre es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'Contraseña es requerida'],
    hide: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.plugin(mongooseHidden)
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'})

module.exports = mongoose.model('Usuario', usuarioSchema)