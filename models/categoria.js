const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El campo nombre es requerido'],
            unique: [true]
        },

        descripcion: {
            type: String,
            required: true,
        },

        estado: {
            type: Boolean,
            required: [true, 'El estado es obligatorio'],
            default: true
        }
    }
)

module.exports = model('Categoria', CategoriaSchema) //Exportar el modelo