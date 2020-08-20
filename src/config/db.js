// Declarando Variáveis Globais (require)

const {Pool} = require('pg')


// Exportando Módulo com a Pool do Database

module.exports = new Pool({
    user: "postgres",
    password: "", 
    host: "localhost",
    port: 5432,
    database: "launchstoredb"
})