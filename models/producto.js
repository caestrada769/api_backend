const {Schema, model} = require('mongoose')

const ProductoSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El campo nombre es requerido'],
            unique: [true]
        },

        categoria: {
            type: String,
            required: [true, 'La categoria es obligatoria'],
        },

        descripcion: {
            type: String,
            required: [true, 'El campo descripción es requerido'],
        },

        precio: {
            type: Number,
            required: [true, 'El campo precio es requerido'],
        },

        estado: {
            type: Boolean,
            required: [true, 'El estado es obligatorio'],
            default: true
        }
    }
)

module.exports = model('Producto', ProductoSchema) //Exportar el modelo