//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Produccion = require('../models/produccion') // la importación de modelos no se instancia con llaves para evitar errores
const D_pedido = require('../models/d_pedido');
const Producto = require('../models/producto');

//Consultar
const produccionGet = async (req, res = response) => {
  try {
    // Obtener la fecha actual del sistema
    const fechaActual = new Date();

    // Obtener la información de la colección D_Pedido y Producto
    const dPedidos = await D_pedido.find();
    const productos = await Producto.find();

    // Crear un mapa para almacenar la información requerida
    const producciones = new Map();

    // Obtener la información requerida desde la colección D_Pedido
    for (const dPedido of dPedidos) {
      const { producto, fecha_entrega, cantidad, fecha_actualizacion, estado } = dPedido;

      // Verificar si la fecha de entrega es mayor a la fecha actual
      if (new Date(fecha_entrega) > fechaActual) {
        const key = `${producto}-${fecha_entrega}`;

        if (!producciones.has(key)) {
          // Obtener la categoría del producto desde la colección Producto
          const categoria = productos.find((prod) => prod.nombre === producto)?.categoria;

          // Agregar la información al mapa de producciones
          producciones.set(key, {
            area: categoria,
            producto,
            cantidad,
            fecha_actualizacion,
            estado,
            fecha_entrega,
          });
        } else {
          // Actualizar la cantidad en caso de existir registro con el mismo producto y fecha de entrega
          producciones.get(key).cantidad += cantidad;
        }
      }
    }

    // Obtener los valores del mapa de producciones
    const produccionesArray = Array.from(producciones.values());

    res.json({ produccionesArray });
  } catch (error) {
    console.error('Ocurrió un error al obtener la información de producción:', error.message);
    res.status(500).json({ msg: 'Ocurrió un error al obtener la información de producción' });
  }
};



//Modificar
const produccionPut = async(req,res = response) => {
  
    const {_id,estado} = req.body
    let mensaje = ''

    try {
        const produccion = await Produccion.findByIdAndUpdate({_id: _id},{fecha_actualizacion: new Date(),estado: estado}) //Buscar por el nombre y modificar
        mensaje = 'La produccion se actualizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al actualizar la produccion'
    }

    res.json({
        msg: mensaje
    })
}


module.exports = {
    produccionGet,
    produccionPut
}