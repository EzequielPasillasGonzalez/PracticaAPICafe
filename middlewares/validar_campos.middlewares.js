const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) =>{
    
    const errors = validationResult(req)     
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    next()


}

module.exports = {
    validarCampos
}