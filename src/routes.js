// Declarando Variáveis Globais (require)

const express = require('express')

const home_page = require('./app/controllers/home/home_page')

const new_product = require('./app/controllers/products/new_product')

const routes = express.Router()


// Configurando Rotas (Home)

routes.get('/', home_page.redirect)
routes.get('/home', home_page.index)


// Configurando Rotas (Products)

routes.get('/products/create', new_product.index)
routes.post('/products/create', new_product.create)


// Alias

routes.get('/ads/create', new_product.redirect)


// Exportando Módulo (routes)

module.exports = routes