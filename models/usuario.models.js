const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']        
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']        
    },
    img: {
        type: String,        
    },
    role: {
        type: String,        
        required: true,
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    order: {
        type: [String], // Tipo de elementos en la lista
        default: [], // Valor por defecto: una lista vacía
    }

})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user} = this.toObject() // se saca la version y el password y el resto se guarda en ...usuario para poder mostrarlo o cualquier otra cosa         
    user.uID = _id
    return user
}


module.exports = model('User', UsuarioSchema)