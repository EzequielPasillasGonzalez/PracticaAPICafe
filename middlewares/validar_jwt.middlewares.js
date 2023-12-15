const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.models');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('awt_token') // Como se esepecifica aqui, es como el front-end lo tiene que enviar

    if(!token) {
        return res.status(401).json({
            ok: false,
            body: 'No hay token de autorizacion'
        })
    }

    try {
        
        const  { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  //Se verifica si el token es valido y se le exrtae el uid

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)                      
        
        // Validacion de null
        if( !usuario){
            return res.status(401).json({
                ok: false,
                body: 'El usuario no existe'
            })
        }

        const {nombre, correo, role, state} = usuario

        // Verificar si el usuario esta activo o no
        if(!state){
            return res.status(401).json({
                ok: false,
                body: 'El usuario esta inactivo'
            })
        }
    
        // Guardar el usuario
        req.usuario = {nombre, correo, role, uid} // Se le manda el uid por el request para los siguientes controladores

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            body: 'Token no valido'
        })
    }    
}

module.exports = {
    validarJWT
}