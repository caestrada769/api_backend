const {Schema, model} = require('mongoose')

const ProduccionSchema = Schema(
    {
        area: {
            type: String,
            required: true
        },

        producto: {
            type: String,
            required: true
        },

        cantidad: {
            type: Number,
            required: true
        },

        fecha_actualizacion: {
            type: Date,
            required: true,
        },

        estado: {
            type: String,
            required: true,
        },

        fecha_entrega: {
            type: Date,
            required: true,
        }
    }
)

module.exports = model('Produccion', ProduccionSchema) //Exportar el modelo