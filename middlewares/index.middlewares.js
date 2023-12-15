const validarCampos = require('../middlewares/validar_campos.middlewares')
const validarJWT = require('../middlewares/validar_jwt.middlewares')
const validaRoles = require('../middlewares/validar_role.middlewares')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}