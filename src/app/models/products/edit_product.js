// Declarando Variáveis Globais (require)

const db = require('../../../config/db')


// Exportando Módulo com os Models

module.exports = {
    showEditingProduct(data) {
        const query = `
            SELECT * FROM products
            WHERE products.id = $1
        `

        const values = [
            data.id
        ]
        
        return db.query(query, values)
    },

    updateEditingProduct(data) {
        const query = `
            UPDATE products SET
                category_id = ($2),
                name = ($3),
                description = ($4),
                old_price = ($5),
                price = ($6),
                quantity = ($7),
                status = ($8)
            WHERE id = $1
        `

        const values = [
            data.id,
            data.category_id,
            data.name,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status
        ]

        db.query(query, values)
    },

    deleteEditingProduct(data) {
        const query = `
            DELETE FROM products
            WHERE id = $1
        `

        const values = [
            data.id
        ]

        db.query(query, values)
    }
}