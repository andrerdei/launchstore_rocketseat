// Declarando Variáveis Globais (require)

const categoriesModel = require('../../models/categories/categories')
const editProductModel = require('../../models/products/edit_product')


// Exportando Módulo com os Controllers

module.exports = {
    redirect(req, res) {
        return res.redirect('/products/edit/1')
    },

    async index(req, res) {
        paramsData = req.params
        paramsData.id = Number(paramsData.id)

        try{
            const categoryResults = await categoriesModel.getAllCategories()
            const productResults = await editProductModel.showEditingProduct(paramsData)

            const categoryOptions = categoryResults.rows
            const product = productResults.rows[0]

            if (!product) {
                res.send("Produto não encontrado, tente novamente")
            }

            product.price = product.price.toString()
            product.price = product.price.replace(".", ",")

            return res.render('products/edit_product', {categoryOptions: categoryOptions, product: product})
        }
        
        catch(err){
            res.send("Erro na conexão com o banco de dados, tente novamente")
            throw new Error(`Erro no banco de dados: ${err}`)
        }
    },

    async update(req, res){
        const keys = Object.keys(req.body)

        const categoryIdRegex = new RegExp("^[\\d]{1,6}$", "g")
        const nameRegex = new RegExp("^[A-Za-z][A-Za-z\\s]{1,48}[A-Za-z]$", "g")
        const descriptionRegex = new RegExp("^.{0,340}$", "g")
        const oldPriceRegex = new RegExp("^[\\d]{1,6}([.][\\d]{1,2})?$", "g")
        const priceRegex = new RegExp("^([R][$][\\s])?[\\d]{1,3}([.][\\d]{3})?([,][\\d]{2})$", "g")
        const quantityRegex = new RegExp("^[\\d]{1,6}$", "g")
        const statusRegex = new RegExp("^[0]|[1]$", "g")

        // Os Testes de Regex Resultam em Um Booleano

        const categoryIdTest = categoryIdRegex.test(req.body.category_id)
        const nameTest = nameRegex.test(req.body.name)
        const descriptionTest = descriptionRegex.test(req.body.description)
        const oldPriceTest = oldPriceRegex.test(req.body.old_price)
        const priceTest = priceRegex.test(req.body.price)
        const quantityTest = quantityRegex.test(req.body.quantity)
        const statusTest = statusRegex.test(req.body.status)

        for(key of keys) {
            if(!categoryIdTest
            || !nameTest
            || !descriptionTest
            || !oldPriceTest
            || !priceTest
            || !quantityTest
            || !statusTest) {

                return res.send("Preencha todos os campos corretamente")

            }
        }

        const bodyData = req.body
        const replacePriceRegex = new RegExp("[^\\d]", "g")

        bodyData.price = bodyData.price.replace(replacePriceRegex, "")

        bodyData.id = Number(bodyData.id)
        bodyData.category_id = Number(bodyData.category_id)
        bodyData.old_price = Number(bodyData.old_price)
        bodyData.price = Number(bodyData.price/100)
        bodyData.quantity = Number(bodyData.quantity)
        bodyData.status = Math.abs(bodyData.status)

        if(bodyData.old_price != bodyData.price) {
            const oldProductResults = await editProductModel.showEditingProduct(bodyData)
            const oldProduct = oldProductResults.rows[0]

            bodyData.price != oldProduct.price
                ? bodyData.old_price = oldProduct.price
                : bodyData.old_price = bodyData.old_price
        }

        try{
            await editProductModel.updateEditingProduct(bodyData)
            return res.redirect('/products/create')
        }

        catch(err){
            res.send("Erro na conexão com o banco de dados, tente novamente")
            throw new Error(`Erro no banco de dados: ${err}`)
        }
    },

    async delete(req, res){
        const bodyData = req.body

        console.log(bodyData)
        
        try{
            await editProductModel.deleteEditingProduct(bodyData)
            return res.redirect('/products/create')
        }

        catch(err){
            res.send("Erro na conexão com o banco de dados, tente novamente")
            throw new Error(`Erro no banco de dados: ${err}`)
        }
    }
}