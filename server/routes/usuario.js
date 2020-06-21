const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const {verificaToken, verificaAdminRole} = require('../middlewares/auth')

const app = express()

app.get('/usuario', verificaToken, (req, res) => {
  // return res.json({
  //   usuario: req.usuario,
  //   nombre: req.usuario.nombre,
  //   email: req.usuario.email
  // })
  let desde = Number(req.query.desde) || 0
  let hasta = Number(req.query.hasta) || 5
  Usuario.find({estado: true}, 'nombre estado email img role')
  .skip(desde)
  .limit(hasta)
  .exec((err, usuarios) => {
    if (err) {
      res.status(400).json({ok: false, err})
    } else {
      Usuario.count({estado: true}, (err, num) => {
        res.json({ok: true, num, usuarios})
      })

    }
  })
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  usuario.save((err, usuarioDB) => {
    if (err) {
      res.status(400).json({ok: false, err})
    } else {
      res.json({ok: true, usuario: usuarioDB})
    }
  })

})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  let estadoCambiado = {estado: false}
  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, estadoCambiado, {new: true}, (err, usuarioBorrado) => {
    if (err) {
      res.status(400).json({ok: false, err})
    } else {
      if(!usuarioBorrado) {
        res.status(400).json({ok: false, err: {message: 'Usuario no encontrado'}})
      } else {
        res.json({ok: true, usuario: usuarioBorrado})
      }

    }
  })
})

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

  Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, usuarioDB) => {
    if (err) {
      res.status(400).json({ok: false, err})
    } else {
      res.json({ok: true, usuario: usuarioDB})
    }
  })
})

module.exports = app