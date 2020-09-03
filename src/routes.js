// Declarando Variáveis Globais (require)

const express = require('express')

const home_page = require('./app/controllers/home/home_page')

const new_product = require('./app/controllers/products/new_product')
const edit_product = require('./app/controllers/products/edit_product')

const routes = express.Router()


// Configurando Rotas (Home)

routes.get('/', home_page.redirect)
routes.get('/home', home_page.index)


// Configurando Rotas (Products)

routes.get('/products/create', new_product.index)
routes.post('/products/create', new_product.create)

routes.get('/products/edit', edit_product.redirect)
routes.get('/products/edit/:id', edit_product.index)
routes.put('/products/edit', edit_product.update)
routes.delete('/products/edit', edit_product.delete)


// Alias

routes.get('/ads/create', new_product.redirect)


// Exportando Módulo (routes)

module.exports = routes