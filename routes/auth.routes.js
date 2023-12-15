const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar_campos.middlewares')


const router = Router()

router.post('/login', [
                check('correo', 'El correo es obligatorio').isEmail(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                validarCampos,
], login) //? Se manda a llamar desde los controladores

module.exports = router