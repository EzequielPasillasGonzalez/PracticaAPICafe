const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT } = require('../middlewares/index.middlewares')
const { createOrder } = require('../controllers/paypalPayment.controller')

const router = Router()

router.post('/create', [
    
], createOrder)

module.exports = router