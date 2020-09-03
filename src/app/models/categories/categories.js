// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo com os Models

module.exports = {
    getAllCategories(){
        const query = `
            SELECT id, name
            FROM categories
        `
        
        return db.query(query)
    }
}