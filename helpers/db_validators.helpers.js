const Role = require('../models/role.models')

const Usuario = require('../models/usuario.models')


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role})
    if(!existeRol){
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {    
    const existsEmail = await Usuario.findOne({correo})

    if(existsEmail) {        
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
    }
}

const existeID = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario) {        
        console.log('error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

const nombreRolValido = async (role = '') => {
    const nombreValido = role.endsWith('_role')    

    if(!nombreValido){
        throw new Error('El nombre debe de contener _role al final para que sea valido')
    }
}

const existeRol = async (role = '') =>{
    const existsRol = await Role.findOne({role})    

    if(existsRol){
        throw new Error(`El rol ${role} ya existe en la base de datos`)
    }
}

const existeIDRole = async (id = '') => {
    const existeRole = await Role.findById(id)

    if(!existeRole) {        
        console.log('error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

// const stateValido = async (state) => {
//     const ex
// }

module.exports = {
    esRoleValido,
    emailExiste,
    existeID,
    nombreRolValido,
    existeRol,
    existeIDRole
}