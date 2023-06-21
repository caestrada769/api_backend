//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Categoria = require('../models/categoria') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const categoriaGet = async(req, res = response) => {
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const categorias = await Categoria.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        categorias
    })
}

//Registrar o insertar
const categoriaPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)

    try {
        const categoria = new Categoria(body) //Instanciar el objeto
        await categoria.save()
        mensaje = 'La inserción se realizó exitosamente'
    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else if (error.name === 'MongoError' || error.code === 11000){
                mensaje = 'El nombre de la categoria ya existe'
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
const categoriaPut = async(req,res = response) => {
  
    const {nombre,descripcion,estado} = req.body
    let mensaje = ''

    try {
        const categoria = await Categoria.findOneAndUpdate({nombre: nombre},{descripcion: descripcion,estado: estado}) //Buscar por el nombre y modificar
        mensaje = 'La actualización se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la modificación'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminar
const categoriaDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const categoria = await Categoria.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'La categoria se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar la categoria'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}