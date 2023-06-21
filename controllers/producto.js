//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Producto = require('../models/producto') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const productoGet = async(req, res = response) => {
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const productos = await Producto.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        productos
    })
}

//Registrar o insertar
const productoPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)

    try {
        const producto = new Producto(body) //Instanciar el objeto
        await producto.save()
        mensaje = 'El producto se creo exitosamente'
    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else if (error.name === 'MongoError' || error.code === 11000){
                mensaje = 'El nombre del producto ya existe'
            } else {
                console.error('Ocurrió un error al crear el producto:', error.message);
                mensaje = 'Ocurrió un error al crear el producto';
            }
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const productoPut = async(req,res = response) => {
  
    const {nombre,categoria,descripcion,precio,estado} = req.body
    let mensaje = ''

    try {
        const producto = await Producto.findOneAndUpdate({nombre: nombre},{categoria: categoria,descripcion: descripcion,precio: precio,estado: estado}) //Buscar por el nombre y modificar
        mensaje = 'El producto se actualizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al actualizar el producto'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminar
const productoDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const producto = await Producto.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'El producto se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar el producto'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}