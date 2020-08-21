// Declarando Variáveis Globais (require)

const express = require('express')

const routes = express.Router()


// Configurando Rotas

routes.get('/', (req, res) => {
    res.render('./home/home_page')
})


// Exportando Módulo (routes)

module.exports = routes