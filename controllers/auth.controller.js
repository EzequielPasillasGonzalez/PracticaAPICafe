const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/generarJWT.helpers');

const login = async (req, res = response) =>{

    const {correo, password} = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
                ok: false,
                body: "El correo no es correcto"
            })
        }
        

        // Si el usuario esta activo
        if(!usuario.state){
            return res.status(400).json({
                ok: false,
                body: "El estado false"
            })
        }

        // Verficar la contraseña
        const password_validate = bcryptjs.compareSync(password, usuario.password)

        if(!password_validate){
            return res.status(400).json({
                ok: false,
                body: "El password no es correcto"
            })
        }

        // Generar el JWT - Token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            body: "Hable con el administrador, problemas del servidor"
        })
    }
}

module.exports = {login}