// Declarando Variáveis (require)

const express = require('express')
const nunjucks = require('nunjucks')
const method_override = require('method-override')

const routes = require('./routes')

const server = express()


// Configurando Middlewares

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(method_override('_method'))
server.use(routes)


// Configurando View Engine (Nunjucks)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})


// Inicializando Servidor

server.listen(5000, () => {
    console.log("server is running")
})