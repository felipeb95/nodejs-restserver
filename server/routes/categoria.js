const express = require('express')

const {verificaToken} = require('../middlewares/auth')

let app = express()

let Categoria = require('../models/categoria')

app.get('/categoria', (req, res) => {

})

app.get('/categoria/:id', (req, res) => {

})

app.post('/categoria', (req, res) => {

})

app.put('/categoria/:id', (req, res) => {

})

app.delete('/categoria/:id', (req, res) => {

})

module.exports = app