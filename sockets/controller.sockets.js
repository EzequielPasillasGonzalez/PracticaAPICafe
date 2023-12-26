const { Socket }       = require("socket.io")

const { comprobarJWT } = require("../helpers/index.helpers")
const { ChatMensajes}  = require("../models/index.models")

const chatMensajes = new ChatMensajes()


const socketController = async (socket = new Socket(), io) => {

    const usuario = await comprobarJWT(socket.handshake.headers.awt_token)

    if(!usuario){
        return socket.disconnect()
    }

    console.log(`Se conecto ${usuario.nombre}`);

    // agregar al usuario conectado
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios_activos', chatMensajes.usuariosArr)
    socket.emit('recibir_mensajes', chatMensajes.ultimos10)

    // Conectarlo a una sala especial
    socket.join(usuario.id) // Salas: global, por socket.id y por usuario.id

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {        
        chatMensajes.desconectarUsuario(usuario.id)
        io.emit('usuarios_activos', chatMensajes.usuariosArr)

    })

    // Enviar mensajes
    socket.on('enviar_mensaje', ({uid, mensaje}) => {        

        if(uid) {
            // Mensaje privado
            socket.to(uid).emit('mensaje_privado', {de: usuario.nombre, mensaje})
        }else{
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit('recibir_mensajes', chatMensajes.ultimos10)
        }

        
    })


}

module.exports = {
    socketController
}