const {Router} = require ('express')

const route = Router()

const {produccionGet, produccionPut} = require('../controllers/produccion')

route.get('/', produccionGet)

route.put('/', produccionPut)

module.exports = route