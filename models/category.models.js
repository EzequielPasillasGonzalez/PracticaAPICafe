const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    npmbre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

CategorySchema.methods.toJSON = function () {
    const {__v, _id, ...category} = this.toObject()    
    category.uID = _id
    return category
}

module.exports = model('Category', CategorySchema) // Category, verifica si la coleccion existe en mongodb y si no la crea