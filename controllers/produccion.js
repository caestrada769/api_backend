//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Produccion = require('../models/produccion') // la importación de modelos no se instancia con llaves para evitar errores
const D_pedido = require('../models/d_pedido');
const Producto = require('../models/producto');

//Consultar
const produccionGet = async(req, res = response) => {
    const {producto} = req.query //Desestructuración

    //Consultar todas la rodenes de producción y mostarlas de forma ascendente
    const producciones = await Produccion.find().sort({ fecha_entrega: 1 }) // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        producciones
    })
}

// Registrar o insertar
const produccionPost = async (req, res = response) => {
  let mensaje = '';

  try {
    // Obtener la información de la colección D_Pedido y Producto
    const dPedidos = await D_pedido.find();
    const productos = await Producto.find();

    // Crear un mapa para almacenar la cantidad por producto y fecha de entrega
    const cantidadesPorProductoFecha = new Map();

    // Obtener la cantidad por producto y fecha de entrega desde la colección D_Pedido
    for (const dPedido of dPedidos) {
      const { producto, fecha_entrega, cantidad } = dPedido;

      const key = `${producto}-${fecha_entrega}`;

      if (cantidadesPorProductoFecha.has(key)) {
        cantidadesPorProductoFecha.set(key, cantidadesPorProductoFecha.get(key) + cantidad);
      } else {
        cantidadesPorProductoFecha.set(key, cantidad);
      }
    }

    const existingProducciones = await Produccion.find();

    // Verificar si existen registros en Produccion que no estén en d_pedido
    for (const produccion of existingProducciones) {
      const { producto, fecha_entrega } = produccion;
      const key = `${producto}-${fecha_entrega}`;

      if (!cantidadesPorProductoFecha.has(key)) {
        await produccion.deleteOne();
      }
    }

    // Realizar el registro de Producción con la información obtenida
    for (const [key, cantidad] of cantidadesPorProductoFecha.entries()) {
      const [producto, fecha_entrega] = key.split('-');

      const categoria = productos.find((prod) => prod.nombre === producto)?.categoria;

      // Verificar si ya existe un registro de Producción con el mismo producto y fecha de entrega
      let existingProduccion = await Produccion.findOne({ producto, fecha_entrega });

      if (existingProduccion) {
        // Si ya existe una producción, se verifica si el estado es "En espera"
        if (existingProduccion.estado !== "En espera") {
          continue; // Se salta la iteración y pasa al siguiente registro
        }
        existingProduccion.cantidad = cantidad;
        existingProduccion.fecha_actualizacion = new Date(); // Se actualiza la fecha de actualización
        await existingProduccion.save();
      } else {
        const produccion = new Produccion({
          area: categoria,
          producto,
          cantidad,
          fecha_actualizacion: new Date(), // Obtener la fecha actual del equipo
          estado: "En espera", // Estado inicial como "En espera"
          fecha_entrega,
        });

        await produccion.save();
      }
    }

    mensaje = 'Las órdenes de producción se actualizaron exitosamente';
  } catch (error) {
    console.error('Ocurrió un error al crear las órdenes de producción:', error.message);
    mensaje = 'Ocurrió un error al actualizar las órdenes de producción';
  }

  res.json({
    msg: mensaje,
  });
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

//Eliminar
const produccionDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const produccion = await Produccion.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'La produccion se elimino exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas al eliminar la produccion'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    produccionGet,
    produccionPost,
    produccionPut,
    produccionDelete
}