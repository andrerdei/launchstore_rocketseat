// Declarando Variáveis (require)

const express = require('express')
const nunjucks = require('nunjucks')

const routes = require('./routes')

const server = express()


// Configurando Middlewares

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
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