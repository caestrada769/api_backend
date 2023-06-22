const {Schema, model} = require('mongoose')

const D_pedidoSchema = Schema(
    {
        producto: {
            type: String,
            required: [true, 'El campo nombre es requerido']
        },

        cantidad: {
            type: Number,
            required: [true, 'El campo cantidad es requerido']
        },

        fecha_entrega: {
            type: Date,
            required: [true, 'El campo fecha entrega es requerido']
        },

        estado: {
            type: String,
            required: true,
            enum: ['Tomado','En preparacion', 'Terminado']
        },

        fecha_actualizacion: {
            type: Date,
            default: new Date()
        }
    }
)

module.exports = model('D_pedido',D_pedidoSchema) //Exportar el modelo