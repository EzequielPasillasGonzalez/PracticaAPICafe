const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.models')


const usuariosGet = async (req, res = response) => {
    
    const query = {state: true} //? Es para contar los que estan activos

    let { limit, from} = req.query

    // Verificar y asignar valores predeterminados si son cadenas vacías o no están definidos
    limit = limit === '' || limit === undefined ? 2 : Number(limit);
    from = from === '' || from === undefined ? 0 : Number(from);

    const [total, user] = await Promise.all([
        Usuario.countDocuments(query), //? Buscan solo los que estan activos
        Usuario.find(query)
                        .skip(Number(from))
                        .limit(Number(limit))
    ])

    res.json({
        ok: true, 
        total,       
        body: user,        
    })
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params
    const { _id, password, google, ...resto } = req.body

    
    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    console.log(resto);
    //Todo: validar con la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        ok: true,        
        body: usuario
    })
}

const usuariosPost = async (req, res = response) => {
    
    const{nombre, correo, password, role} = req.body
    const usuario = new Usuario( {nombre, correo, password, role} )    

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save()
    

    res.json({
        ok: true,
        body: usuario
    })
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params        

    // Se elimina logicamente, solo se pone en false el esado
    const usuario = await Usuario.findByIdAndUpdate(id, {state: false}) // Se cambia el estado para no perder integridad

    const usuarioAutenticado = req.usuario

    res.json({
        ok: true,
        body: usuario,  
        user: usuarioAutenticado        
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        body: 'PATCH Api - Controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}