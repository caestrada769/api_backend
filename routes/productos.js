const {Router} = require ('express')

const route = Router()

const {productoGet, productoPost, productoPut, productoDelete} = require('../controllers/producto')

route.get('/', productoGet)

route.post('/', productoPost)

route.put('/', productoPut)

route.delete('/', productoDelete)

module.exports = route