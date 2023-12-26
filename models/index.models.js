const Category     = require('./category.models');
const ChatMensajes = require('./chat_mensajes.models');
const Producto     = require('./products.models');
const Role         = require('./role.models')
const Server       = require('./server.models')
const Usuario      = require('./usuario.models')



module.exports = {
    Category,
    Producto,
    Role,
    Server,
    Usuario,
    ChatMensajes
}

