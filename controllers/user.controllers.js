const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.models')


const usuariosGet = async (req, res = response) => {
    
    const query = {state: true} //? Es para contar los que estan activos

    let { limit, from} = req.query

    // Verificar y asignar valores predeterminados si son cadenas vacías o no están definidos
    limit = limit === '' || limit === undefined ? 5 : Number(limit);
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
    const { _id, passwordNew, google, order, passwordOld, ...resto } = req.body

    
    if(passwordOld && passwordNew){

        const user = await Usuario.findById(id);

        // Verficar la contraseña
        const password_validate = bcryptjs.compareSync(passwordOld, user.password)
        
        if(!password_validate){
            return res.status(400).json({
                ok: false,
                body: "El password no es correcto"
            })
        }

        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(passwordNew, salt)        
    }    
    
    //Todo: validar con la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new : true})

    if(order){
        const user = await Usuario.findById(id);
        // Actualizar la propiedad "order" con los nuevos valores
        user.order.push(order);

        // Guardar el usuario actualizado en la base de datos
        await user.save();
    }



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