// Exportando Módulo com os Controllers

module.exports = {
    redirect(req, res) {
        return res.redirect('/home')
    },

    index(req, res) {
        return res.render('home/home_page')
    }
}