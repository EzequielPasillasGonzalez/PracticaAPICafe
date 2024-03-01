const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT } = require('../middlewares/index.middlewares')
const { createOrder, captureOrder, notifyOrder, getOrder } = require('../controllers/paypalPayment.controller')

const router = Router()

router.post('/create', [
    
], createOrder)

router.post('/captureOrder/:id', [
    
], captureOrder)

router.get('/getOrder/:id', [
    
], getOrder)

router.post('/notifyOrder', [
    
], notifyOrder)

module.exports = router