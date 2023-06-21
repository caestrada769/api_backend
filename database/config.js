const mongoose = require('mongoose')

const dbConnection = () => {
    try{
        mongoose.connect(process.env.MONGO_CNN)
        console.log('Conexión exitosa a la base de datos parisina')
    }
    catch(error){
        console.log('Error en BD')
        throw new error('Error conectando a la base de datos')
    }
}

module.exports = { dbConnection }