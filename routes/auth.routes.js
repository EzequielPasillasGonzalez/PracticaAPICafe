const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSigIn } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar_campos.middlewares')


const router = Router()

router.post('/login', [
                check('correo', 'El correo es obligatorio').isEmail(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                validarCampos,
], login) //? Se manda a llamar desde los controladores

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),    
    validarCampos,
], googleSigIn) 

module.exports = router