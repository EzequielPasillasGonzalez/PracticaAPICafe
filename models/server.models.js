const express = require('express')
var cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbconnection } = require('../database/config.db')
const { socketController } = require('../sockets/controller.sockets')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
                auth     : '/api/auth', // Path para autentificacion
                buscar   : '/api/search',
                category : '/api/category',
                products : '/api/products',
                role     : '/api/role',
                uploads  : '/api/uploads',
                user     : '/api/user',
                email     : '/api/email',
        }

        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

        // Conectar a la base de datos
        this.connectDB()

        //Todo: Middleswares
        this.middlewares()


        //Todo: Rutas de la aplicacion
        this.routes()

        //Todo: Sockects
        this.sockets()
    }

    async connectDB(){
        await dbconnection()
    }

    middlewares(){
        // CORS
        // this.app.use(cors({
        //     origin: '*', // Puedes ajustar esto según tus necesidades
        //     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
        //     credentials: true,
        // }));

        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.buscar, require('../routes/search.routes'))
        this.app.use(this.paths.category, require('../routes/category.routes'))
        this.app.use(this.paths.products, require('../routes/products.routes'))
        this.app.use(this.paths.role, require('../routes/role.routes'))
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
        this.app.use(this.paths.user, require('../routes/user.routes'))
        this.app.use(this.paths.email, require('../routes/sendEmail.routes'))
    }

    sockets() {

        this.io.on('connection', (socket) => socketController(socket, this.io));

    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server