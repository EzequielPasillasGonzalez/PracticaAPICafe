const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT } = require('../middlewares/index.middlewares')
const { sendEmail } = require('../controllers/email.controller')



const router = Router()

router.post('/', [
    validarJWT,    
    check('to', 'El correo a donde va dirigido es obligatorio').isEmail(),
    check('message', 'El cuerpo del mensaje es obligatorio').not().isEmpty(),
    check('subject', 'El tema del mensaje es obligatorio').not().isEmpty(),
    validarCampos,
], sendEmail)

module.exports = router
