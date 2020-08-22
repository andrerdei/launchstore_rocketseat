// Declarando Variáveis Globais (require)

const express = require('express')

const home_page = require('./app/controllers/home/home_page')

const routes = express.Router()


// Configurando Rotas (Home)

routes.get('/', home_page.redirect)

routes.get('/home', home_page.index)


// Exportando Módulo (routes)

module.exports = routes