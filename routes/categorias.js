const {Router} = require ('express')

const route = Router()

const {categoriaGet, categoriaPost, categoriaPut, categoriaDelete} = require('../controllers/categoria')

route.get('/', categoriaGet)

route.post('/', categoriaPost)

route.put('/', categoriaPut)

route.delete('/', categoriaDelete)

module.exports = route