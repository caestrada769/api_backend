//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const D_pedido = require('../models/d_pedido') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const d_pedidoGet = async(req, res = response) => {
    const {producto} = req.query //Desestructuración

    //Consultar todos los usuarios
    const d_pedidos = await D_pedido.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        d_pedidos
    })
}

//Registrar o insertar
const d_pedidoPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)

    try {
        const d_pedido = new D_pedido(body) //Instanciar el objeto
        await d_pedido.save()
        mensaje = 'La inserción se realizó exitosamente'
    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else {
                console.error('Ocurrió un error al guardar la categoria:', error.message);
                mensaje = 'Ocurrió un error al guardar la categoria';
            }
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const d_pedidoPut = async(req,res = response) => {
  
    const {producto,cantidad,fecha_entrega} = req.body
    let mensaje = ''

    try {
        const d_pedido = await D_pedido.findOneAndUpdate({producto: producto},{cantidad: cantidad,fecha_entrega: fecha_entrega}) //Buscar por el producto y modificar
        mensaje = 'La actualización se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la modificación'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminar
const d_pedidoDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const d_pedido = await D_pedido.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'La categoria se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar la categoria'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    d_pedidoGet,
    d_pedidoPost,
    d_pedidoPut,
    d_pedidoDelete
}