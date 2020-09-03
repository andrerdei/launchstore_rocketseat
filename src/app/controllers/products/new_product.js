// Declarando Variáveis Globais (require)

const categoriesModel = require('../../models/categories/categories')
const newProductModel = require('../../models/products/new_product')


// Exportando Módulo com os Controllers

module.exports = {
    redirect(req, res) {
        return res.redirect('/products/create')
    },

    async index(req, res) {
        try{
            const results = await categoriesModel.getAllCategories()
            const categoryOptions = results.rows

            return res.render('products/new_product', {categoryOptions: categoryOptions})
        }
        
        catch(err){
            res.send("Erro na conexão com o banco de dados, tente novamente")
            throw new Error(`Erro no banco de dados: ${err}`)
        }
    },

    async create(req, res) {
        const keys = Object.keys(req.body)

        const categoryIdRegex = new RegExp("^[\\d]{1,6}$", "g")
        const nameRegex = new RegExp("^[A-Za-z][A-Za-z\\s]{1,48}[A-Za-z]$", "g")
        const descriptionRegex = new RegExp("^.{0,340}$", "g")
        const priceRegex = new RegExp("^([R][$][\\s])?[\\d]{1,3}([.][\\d]{3})?([,][\\d]{2})$", "g")
        const quantityRegex = new RegExp("^[\\d]{1,6}$", "g")

        // Os Testes de Regex Resultam em Um Booleano

        const categoryIdTest = categoryIdRegex.test(req.body.category_id)
        const nameTest = nameRegex.test(req.body.name)
        const descriptionTest = descriptionRegex.test(req.body.description)
        const priceTest = priceRegex.test(req.body.price)
        const quantityTest = quantityRegex.test(req.body.quantity)

        for(key of keys) {
            if(!categoryIdTest
            || !nameTest
            || !descriptionTest
            || !priceTest
            || !quantityTest) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        const bodyData = req.body
        const replacePriceRegex = new RegExp("[^\\d]", "g")

        bodyData.price = bodyData.price.replace(replacePriceRegex, "")

        bodyData.category_id = Number(bodyData.category_id)
        bodyData.price = Number(bodyData.price/100)
        bodyData.quantity = Number(bodyData.quantity)

        try{ 
            await newProductModel.createNewProduct(bodyData)
            return res.redirect('/products/create')
        }

        catch(err){
            res.send("Erro na conexão com o banco de dados, tente novamente")
            throw new Error(`Erro no banco de dados: ${err}`)
        }
    }
}