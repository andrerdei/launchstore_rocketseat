// Declarando Variáveis Globais (require)

const express = require('express')

const routes = express.Router()


// Configurando Rotas

routes.get('/', (req, res) => {
    res.render('layout')
})


// Exportando Módulo (routes)

module.exports = routes