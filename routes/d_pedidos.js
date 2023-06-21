const {Router} = require ('express')

const route = Router()

const {d_pedidoGet,d_pedidoPost,d_pedidoPut,d_pedidoDelete} = require('../controllers/d_pedido')

route.get('/',d_pedidoGet)

route.post('/',d_pedidoPost)

route.put('/',d_pedidoPut)

route.delete('/',d_pedidoDelete)

module.exports = route