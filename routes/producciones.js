const {Router} = require ('express')

const route = Router()

const {produccionGet, produccionPost, produccionPut, produccionDelete} = require('../controllers/produccion')

route.get('/', produccionGet)

route.post('/', produccionPost)

route.put('/', produccionPut)

route.delete('/', produccionDelete)

module.exports = route