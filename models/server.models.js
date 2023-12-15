const express = require('express')
var cors = require('cors')
const { dbconnection } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth     : '/api/auth', // Path para autentificacion
            user     : '/api/user',
            role     : '/api/role',
            category : '/api/category'
        }

        // Conectar a la base de datos
        this.connectDB()

        //Todo: Middleswares
        this.middlewares()


        //Todo: Rutas de la aplicacion
        this.routes()
    }

    async connectDB(){
        await dbconnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.user, require('../routes/user.routes'))
        this.app.use(this.paths.role, require('../routes/role.routes'))
        this.app.use(this.paths.category, require('../routes/category.routes'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port http://localhost:${this.port}!`))
    }
}

module.exports = Server