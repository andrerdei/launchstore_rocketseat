// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo com os Models

module.exports = {
    async getAllCategories(){
        const query = `
            SELECT * FROM categories
        `
        
        return db.query(query)
    },
    createNewProduct(data){
        const query = `
            INSERT INTO products(
                category_id,
                user_id,
                name,
                description,
                old_price,
                price,
                quantity,
                status                
            )

            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `

        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1
        ]

        console.log(values)
        
        return db.query(query, values)
    }
}