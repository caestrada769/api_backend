require('dotenv').config()//importar paquete dotenv

const { Server } = require('./models/server')//si se hace el export con llaves aca se debe llamar igual

const server = new Server()//Instanciar el objeto

server.listen()